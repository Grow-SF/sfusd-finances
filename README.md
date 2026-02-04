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

## Project Structure

```
sfusd-finances/
├── app/
│   ├── data.ts         # Budget and financial data
│   ├── page.tsx        # Main visualization page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Development

The application is built with Next.js App Router and uses client-side rendering for the interactive charts. All financial data is stored in `app/data.ts`.

To add or modify visualizations:
1. Update data in `app/data.ts`
2. Edit chart components in `app/page.tsx`
3. Changes will hot-reload automatically in development mode

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
