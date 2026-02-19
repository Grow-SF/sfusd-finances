#!/usr/bin/env node

/**
 * Download all data sources referenced in app/data.ts
 * Saves them in original format to data-sources/ directory with metadata
 */

const fs = require('fs');
const path = require('path');

// Create directories
const BASE_DIR = path.join(__dirname, '..', 'data-sources');
const CATEGORIES = {
  'press-releases': /sfusd\.edu.*press-release/i,
  'reports': /\.pdf$/i,
  'archives': /previous-fiscal-years|lcap/i,
  'news': /kqed|brookings|substack/i,
};

function categorizeUrl(url) {
  for (const [category, pattern] of Object.entries(CATEGORIES)) {
    if (pattern.test(url)) {
      return category;
    }
  }
  return 'archives'; // default category
}

function sanitizeFilename(label, url) {
  // Create a filename from the label
  const base = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  // Determine extension from URL
  const ext = url.endsWith('.pdf') ? '.pdf' : '.html';
  return base + ext;
}

async function downloadSource(source) {
  const { label, url } = source;
  const category = categorizeUrl(url);
  const filename = sanitizeFilename(label, url);
  const categoryDir = path.join(BASE_DIR, category);
  const filePath = path.join(categoryDir, filename);

  console.log(`Downloading: ${label}`);
  console.log(`  URL: ${url}`);
  console.log(`  Category: ${category}`);
  console.log(`  File: ${filename}`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SFUSD-Finances-Data-Collector/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';

    // Ensure directory exists
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Save the file
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    console.log(`  ✓ Saved (${buffer.length} bytes)\n`);

    return {
      label,
      url,
      localPath: path.relative(path.join(__dirname, '..'), filePath),
      contentType,
      status: 'success',
      downloadedAt: new Date().toISOString(),
      size: buffer.length,
    };
  } catch (error) {
    console.log(`  ✗ Failed: ${error.message}\n`);
    return {
      label,
      url,
      localPath: null,
      contentType: null,
      status: 'failed',
      error: error.message,
      downloadedAt: new Date().toISOString(),
    };
  }
}

async function main() {
  console.log('SFUSD Finances - Source Downloader\n');
  console.log('Reading sources from app/data.ts...\n');

  // Read and parse app/data.ts to extract sources
  const dataFilePath = path.join(__dirname, '..', 'app', 'data.ts');
  const dataFileContent = fs.readFileSync(dataFilePath, 'utf-8');

  // Extract sources array using regex
  // This is a simple parser - assumes sources array is formatted as shown in the file
  const sourcesMatch = dataFileContent.match(/export const sources = \[([\s\S]*?)\]/);
  if (!sourcesMatch) {
    console.error('Error: Could not find sources array in app/data.ts');
    process.exit(1);
  }

  // Parse the sources array (simplified JSON-like parsing)
  const sourcesArrayText = sourcesMatch[1];
  const sourceMatches = [...sourcesArrayText.matchAll(/\{\s*label:\s*'([^']+)',\s*url:\s*'([^']+)'\s*\}/g)];

  const sources = sourceMatches.map(match => ({
    label: match[1],
    url: match[2],
  }));

  console.log(`Found ${sources.length} sources to download\n`);
  console.log('='.repeat(60) + '\n');

  // Create base directory if it doesn't exist
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  // Download all sources
  const results = [];
  for (const source of sources) {
    const result = await downloadSource(source);
    results.push(result);
    // Small delay to be nice to servers
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Write metadata
  const metadata = {
    lastDownload: new Date().toISOString(),
    totalSources: sources.length,
    successful: results.filter(r => r.status === 'success').length,
    failed: results.filter(r => r.status === 'failed').length,
    sources: results,
  };

  const metadataPath = path.join(BASE_DIR, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log('='.repeat(60));
  console.log('\nSummary:');
  console.log(`  Total sources: ${metadata.totalSources}`);
  console.log(`  Successful: ${metadata.successful}`);
  console.log(`  Failed: ${metadata.failed}`);
  console.log(`\nMetadata saved to: ${path.relative(path.join(__dirname, '..'), metadataPath)}`);

  if (metadata.failed > 0) {
    console.log('\nFailed downloads:');
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`  - ${r.label}: ${r.error}`);
    });
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
