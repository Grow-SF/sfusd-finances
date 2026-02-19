# SFUSD Finances

A data visualization website for San Francisco Unified School District (SFUSD) budget and financial information.

## Overview

This project provides interactive visualizations of SFUSD financial data, including:

- Budget snapshots and trends
- Deficit analysis and timeline
- Dollar breakdown (where the money goes)
- COVID-19 fiscal cliff impact
- Enrollment trends
- Teacher strike impacts
- Future projections

## Tech Stack

- **Framework**: Next.js (latest) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Package Manager**: npm

## Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sfusd-finances
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server (requires build first)
- `npm run download-sources` - Download all data sources from app/data.ts

## Project Structure

```
sfusd-finances/
├── .claude/
│   └── skills/         # Claude Code skills for data management
│       ├── add-source/          # Add new budget source (PRIMARY)
│       ├── download-sources/    # Download all sources
│       ├── parse-source/        # Parse individual source
│       ├── update-data/         # Update app/data.ts
│       └── refresh-all/         # Full refresh (reproducibility)
├── app/
│   ├── data.ts         # Budget and financial data
│   ├── page.tsx        # Main visualization page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── data-sources/       # Downloaded source documents (HTML, PDF)
│   ├── press-releases/ # SFUSD budget press releases
│   ├── reports/        # Financial reports and PDFs
│   ├── archives/       # Archive pages
│   ├── news/           # News articles
│   └── metadata.json   # Download tracking
├── scripts/
│   └── download-sources.js  # Source download script
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Development

The application is built with Next.js App Router and uses client-side rendering for the interactive charts. All financial data is stored in `app/data.ts`.

### Updating Visualizations

To add or modify visualizations:
1. Update data in `app/data.ts`
2. Edit chart components in `app/page.tsx`
3. Changes will hot-reload automatically in development mode

### Data Management with Claude Code

This project includes Claude Code skills for managing financial data sources:

#### Primary Workflow: Adding New Budget Data

When SFUSD releases new budget information (e.g., FY 2026-27), use:

```bash
/add-source "https://sfusd.edu/...new-budget-url" "FY 2026-27 Adopted Budget"
```

This skill will:
1. Download the new source document
2. Parse and extract financial data
3. Validate the extracted data
4. Show you a diff of proposed changes
5. Update `app/data.ts` after your approval

#### Secondary Workflow: Reproducibility

To re-download and re-process all sources from scratch:

```bash
/refresh-all
```

This is useful for verifying data reproducibility or when sources have been updated.

#### Individual Skills

Available skills can be used independently:

- `/add-source <url> <label>` - **PRIMARY**: Add new budget source (complete workflow)
- `/download-sources` - Download all sources referenced in `app/data.ts`
- `/parse-source <filename>` - Parse a downloaded source file
- `/update-data` - Update `app/data.ts` with parsed data
- `/refresh-all` - **SECONDARY**: Complete refresh from all sources

#### Manual Data Updates

You can also update data manually:

1. Edit `app/data.ts` directly
2. Run `npm run build` to verify TypeScript compiles
3. Run `npm run dev` to see your changes

#### Downloading Sources Manually

To download all source documents without Claude Code:

```bash
npm run download-sources
```

Sources will be saved to `data-sources/` categorized by type.

## Deployment

This project can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS
- Any Node.js hosting platform

For Vercel deployment:
```bash
npm run build
```

Then connect your repository to Vercel for automatic deployments.
