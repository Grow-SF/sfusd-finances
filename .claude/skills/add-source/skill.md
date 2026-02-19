# Add Source

## Description
Add a new data source (e.g., new SFUSD budget release) - downloads, parses, validates, and updates app/data.ts

## Usage
```
/add-source <url> <label>
```

Example:
```
/add-source "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2026-06-24-sf-board-education-adopts-budget-2026-27-school-year" "FY 2026-27 Adopted Budget"
```

## Primary Use Case
This is the **main skill** you'll use when new SFUSD budget data is released. It handles the complete workflow from download to updating the visualization data.

## Instructions

When the user invokes this skill with a URL and label, follow these steps:

### Step 1: Validate Arguments
- Ensure URL and label are provided
- Validate URL format (should be a valid HTTP/HTTPS URL)
- If arguments are missing or invalid, ask the user to provide them

### Step 2: Download the Source
- Use the WebFetch tool to download the source
- Extract the title and main content from the page
- Determine the content type (HTML page, PDF, etc.)
- Categorize based on URL patterns:
  - Press releases: URLs containing "sfusd.edu" and "press-release"
  - Reports: URLs ending in ".pdf"
  - Archives: URLs containing "previous-fiscal-years" or "lcap"
  - News: URLs from kqed.org, brookings.edu, substack.com
  - Default: archives

### Step 3: Save the Source
- Create filename from label (lowercase, replace spaces/special chars with hyphens)
- Ensure appropriate data-sources/ subdirectory exists (press-releases/, reports/, archives/, news/)
- Use Write tool to save the downloaded content to data-sources/{category}/{filename}.html
- Report success to user with saved file path

### Step 4: Parse the Source
- Read the downloaded file
- Analyze the content to extract financial data
- Look for:
  - Budget totals (usually in millions, e.g., "$1.2 billion" = 1200)
  - Deficit amounts
  - Enrollment numbers
  - Per-pupil spending
  - Fiscal year (e.g., "2026-27")
  - Revenue sources (LCFF, parcel tax, PEEF)
  - ESSER funding amounts
  - Cut amounts

### Step 5: Structure the Parsed Data
- Format the extracted data to match app/data.ts structure
- Create a JSON object with fields like:
  ```json
  {
    "year": "2026-27",
    "budget": 1250,
    "deficit": 25,
    "enrollment": 47500,
    "lcff": 670,
    "source": "SFUSD Board press release, June 2026",
    "confidence": "high",
    "notes": "Budget and deficit explicitly stated in headline and first paragraph"
  }
  ```

### Step 6: Validate the Data
- Check ranges and data integrity:
  - budget > 0 (typically 1000-1500 for SFUSD)
  - deficit >= 0 (typically 0-150)
  - enrollment > 0 (typically 45000-50000 for SFUSD)
  - year format is "YYYY-YY" (e.g., "2026-27")
  - If per-pupil data available: roughly = budget / enrollment * 1000000
- Flag any suspicious values with warnings
- Ask user to review if confidence is not "high"

### Step 7: Read Current app/data.ts
- Use Read tool to get current contents of app/data.ts
- Identify which data arrays need updating (budgetData, adoptedBudgets, enrollmentData, etc.)
- Prepare updates for relevant arrays

### Step 8: Generate Diff Preview
- Show the user what will change:
  1. **New source entry** to be added to sources array:
     ```typescript
     { label: 'FY 2026-27 Adopted Budget', url: 'https://...' }
     ```

  2. **Data updates** to relevant arrays:
     - If budgetData: show new entry or updated entry
     - If adoptedBudgets: show new entry or updated entry
     - If enrollmentData: show new entry or updated entry
     - Etc.

  3. **Summary** of changes:
     - Number of arrays updated
     - New fiscal year added or existing year updated
     - Key metrics (budget, deficit, enrollment)

### Step 9: Ask for User Approval
- Use AskUserQuestion tool to ask user:
  - "Apply these changes to app/data.ts?"
  - Options:
    - "Yes, apply changes" (recommended)
    - "No, cancel"
    - "Let me review the extracted data" (show full JSON)

### Step 10: Apply Updates (if approved)
- If user approves:
  1. Use Edit tool to add new source to sources array in app/data.ts
  2. Use Edit tool to add/update entries in relevant data arrays
  3. Ensure proper TypeScript formatting is preserved
  4. Ensure comments are preserved

- Update or create data-sources/metadata.json:
  - Read existing metadata if it exists
  - Add new entry for this source
  - Write back using Write tool

### Step 11: Verify and Report
- Read the updated app/data.ts to verify changes applied correctly
- Suggest running `npm run build` to verify TypeScript compiles
- Suggest running `npm run dev` to see updated data in the visualization
- Provide summary:
  - Source downloaded to: {path}
  - Source added to app/data.ts
  - Data updated: {list of arrays modified}
  - Next steps: Run build and dev to verify

## Error Handling
- If download fails: Report error, suggest checking URL
- If parsing fails: Ask user to manually provide data in JSON format
- If validation fails: Show warnings, ask user to confirm or correct
- If update fails: Show error, preserve original file

## Tools Available
- WebFetch: Download sources from URLs
- Read: Read app/data.ts and downloaded files
- Write: Save downloaded sources and metadata
- Edit: Update app/data.ts with new data
- AskUserQuestion: Get user approval before making changes
- Bash: Run npm scripts if needed for verification

## Notes
- Be conservative with data extraction - if unsure, ask user to review
- Always preserve existing formatting and comments in app/data.ts
- Provide clear feedback at each step
- Make it easy for user to verify changes before applying
