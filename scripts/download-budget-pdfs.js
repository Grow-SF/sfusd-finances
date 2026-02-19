#!/usr/bin/env node

/**
 * Download full adopted budget PDFs from SFUSD archives
 * These contain comprehensive budget details beyond press releases
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const budgetDocs = [
  {
    year: '2025-26',
    label: 'FY 2025-26 Adopted Budget (SACS Forms)',
    url: 'https://go.boarddocs.com/ca/sfusd/Board.nsf/files/DHU32S04CBAE/$file/2025-26%20District%20SACS%20%282nd%20Reading%29.pdf',
    filename: 'fy-2025-26-adopted-budget-sacs.pdf'
  },
  {
    year: '2024-25',
    label: 'FY 2024-25 Adopted Budget (SACS Forms)',
    url: 'https://go.boarddocs.com/ca/sfusd/Board.nsf/files/D6G3WA08D0A1/$file/FY%2024-25%20SFUSD%20Budget%20Adoption_2nd%20Reading%20SACS%20Forms%2006-25-2024.pdf',
    filename: 'fy-2024-25-adopted-budget-sacs.pdf'
  },
  {
    year: '2023-24',
    label: 'FY 2023-24 Budget Overview Vol II',
    url: 'https://drive.google.com/file/d/1n4sUMSo2Dk5EZnOs4e-Ra-BTt1Fmvjey/view?usp=drive_link',
    filename: 'fy-2023-24-budget-overview.pdf',
    type: 'google-drive'
  },
  {
    year: '2022-23',
    label: 'FY 2022-23 Budget Overview Vol II',
    url: 'https://drive.google.com/file/d/19nJ_elHeADi_nE81JYYmfHjxp168qRoG/view?usp=sharing',
    filename: 'fy-2022-23-budget-overview.pdf',
    type: 'google-drive'
  },
  {
    year: '2021-22',
    label: 'FY 2021-22 Budget Overview Vol II',
    url: 'https://drive.google.com/file/d/1fWe2vTZmBCZAonQpPEmQ4LUDvm4Rgxen/view?usp=sharing',
    filename: 'fy-2021-22-budget-overview.pdf',
    type: 'google-drive'
  },
  {
    year: '2020-21',
    label: 'FY 2020-21 Budget Overview Vol II (Revised)',
    url: 'https://drive.google.com/file/d/1jClc0vAnyKJzC_w_y8EMJZQ-tvwiOQkF/view',
    filename: 'fy-2020-21-budget-overview-revised.pdf',
    type: 'google-drive'
  }
];

const outputDir = path.join(__dirname, '..', 'data-sources', 'budget-pdfs');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function convertGoogleDriveUrl(url) {
  // Convert Google Drive view URL to direct download URL
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const file = fs.createWriteStream(dest);

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        resolve(stats.size);
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
      reject(err);
    });

    file.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
      reject(err);
    });
  });
}

async function downloadBudgets() {
  console.log('SFUSD Full Budget Documents Downloader\n');
  console.log(`Downloading ${budgetDocs.length} budget documents...\n`);
  console.log('='.repeat(60) + '\n');

  const results = {
    successful: 0,
    failed: 0,
    sources: []
  };

  for (const doc of budgetDocs) {
    console.log(`Downloading: ${doc.label}`);
    console.log(`  Year: ${doc.year}`);
    console.log(`  URL: ${doc.url}`);
    console.log(`  File: ${doc.filename}`);

    const destPath = path.join(outputDir, doc.filename);
    let downloadUrl = doc.url;

    // Convert Google Drive URLs to direct download
    if (doc.type === 'google-drive') {
      downloadUrl = convertGoogleDriveUrl(doc.url);
      console.log(`  Direct URL: ${downloadUrl}`);
    }

    try {
      const size = await downloadFile(downloadUrl, destPath);
      console.log(`  ✓ Saved (${size.toLocaleString()} bytes)\n`);

      results.successful++;
      results.sources.push({
        year: doc.year,
        label: doc.label,
        url: doc.url,
        localPath: `data-sources/budget-pdfs/${doc.filename}`,
        status: 'success',
        size: size
      });
    } catch (error) {
      console.log(`  ✗ Failed: ${error.message}\n`);

      results.failed++;
      results.sources.push({
        year: doc.year,
        label: doc.label,
        url: doc.url,
        localPath: null,
        status: 'failed',
        error: error.message
      });
    }
  }

  console.log('='.repeat(60));
  console.log('\nSummary:');
  console.log(`  Total documents: ${budgetDocs.length}`);
  console.log(`  Successful: ${results.successful}`);
  console.log(`  Failed: ${results.failed}`);

  // Save metadata
  const metadataPath = path.join(outputDir, 'metadata.json');
  const metadata = {
    lastDownload: new Date().toISOString(),
    totalDocuments: budgetDocs.length,
    successful: results.successful,
    failed: results.failed,
    sources: results.sources
  };

  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`\nMetadata saved to: ${metadataPath}`);
}

downloadBudgets().catch(console.error);
