# Update Data

## Description
Update app/data.ts with validated, parsed financial data

## Usage
```
/update-data
```

Typically called after `/parse-source` or as part of `/add-source` or `/refresh-all` workflows.

## Use Case
Takes structured financial data (from parsing) and updates the appropriate data arrays in app/data.ts with user approval.

## Instructions

When the user invokes this skill, follow these steps:

### Step 1: Get Parsed Data
The skill should receive parsed data in JSON format, either:
- From the user directly (if they invoke the skill manually)
- From a previous `/parse-source` invocation
- From `/add-source` or `/refresh-all` orchestration

Expected input format:
```json
{
  "extractedData": {
    "budgetData": {
      "year": "2026-27",
      "totalBudget": 1250,
      "lcff": 670,
      ...
    },
    "adoptedBudget": { ... },
    "enrollmentData": { ... }
  },
  "sourceInfo": {
    "label": "FY 2026-27 Adopted Budget",
    "url": "https://..."
  }
}
```

If no data provided, ask user to provide it or run `/parse-source` first.

### Step 2: Read Current app/data.ts
- Use Read tool to read app/data.ts
- Parse the current data arrays:
  - budgetData
  - revenueVsSpending
  - adoptedBudgets
  - enrollmentData
  - esserFunding
  - deficitTimeline
  - sources
- Understand the current structure and latest entries

### Step 3: Validate New Data
Perform validation checks:

**Data Ranges:**
- budget: 1000-1500 (millions) for SFUSD
- deficit: 0-150 (millions)
- enrollment: 45000-52000 (students)
- lcff: 500-700 (millions)
- perPupil: 20000-30000 (dollars)

**Year Format:**
- Must be "YYYY-YY" format (e.g., "2026-27")
- Should be sequential with existing years (warn if gap)

**Cross-Field Validation:**
- If budget and enrollment both provided: perPupil ≈ budget / enrollment * 1,000,000
- deficit should be <= budget
- revenue (if provided) should be close to budget - deficit

**Flag warnings for:**
- Values outside typical ranges
- Non-sequential years
- Large year-over-year changes (>20%)
- Missing expected fields

### Step 4: Determine Update Strategy
For each data array:
- **Check if year already exists**: If yes, this is an UPDATE; if no, this is an ADD
- **Identify position**: New entries should go at the end (chronologically)
- **Determine which arrays to update**: Only update arrays where we have data

### Step 5: Generate Diff Preview
Create a clear, readable diff showing what will change:

```
CHANGES TO app/data.ts:

1. sources array:
   + Add new entry:
   + { label: 'FY 2026-27 Adopted Budget', url: 'https://...' }

2. budgetData array:
   + Add new entry at end:
   + { year: '2026-27', totalBudget: 1250, lcff: 670, peef: 96,
   +   parcelTax: 106, enrollment: 47500, deficit: 25, esser: 0 }

3. adoptedBudgets array:
   + Add new entry at end:
   + { year: '2026-27', budget: 1250, deficit: 25,
   +   source: 'SFUSD Board press release, June 2026' }

4. enrollmentData array:
   + Add new entry at end:
   + { year: '2026-27', enrollment: 47500, perPupil: 26316 }

SUMMARY:
- Adding data for fiscal year: 2026-27
- Arrays updated: 4 (sources, budgetData, adoptedBudgets, enrollmentData)
- Type: ADD (new year)

VALIDATION:
✓ Budget in valid range (1250M)
✓ Deficit in valid range (25M)
✓ Enrollment in valid range (47,500)
✓ Year format correct (2026-27)
✓ Per-pupil calculation matches (26,316 ≈ 1250M / 47.5K)
⚠ Year 2026-27 follows 2025-26 (no gap, good)
```

### Step 6: Ask for User Approval
Use AskUserQuestion to present the changes:
- Question: "Apply these changes to app/data.ts?"
- Options:
  - "Yes, apply all changes" (recommended)
  - "No, cancel"
  - "Let me review the diff again"
  - "Apply but let me edit first"

### Step 7: Apply Updates (if approved)
If user approves, apply changes using Edit tool:

**For each array:**
1. If adding new source to sources array:
   - Find the end of the array
   - Add new entry before the closing bracket
   - Preserve formatting (2-space indent, trailing comma)

2. If adding new data entry:
   - Find the end of the array
   - Add new entry before the closing bracket
   - Preserve formatting and structure

3. If updating existing entry:
   - Find the entry by year
   - Replace with new values
   - Preserve formatting

**Important:**
- Use Edit tool with exact old_string and new_string
- Preserve all existing comments
- Maintain consistent formatting (spaces, commas, etc.)
- Keep TypeScript types correct

### Step 8: Verify Changes
After applying edits:
1. Read app/data.ts again to verify changes applied
2. Suggest running `npm run build` to verify TypeScript compiles
3. Suggest running `npm run dev` to see changes in visualization

### Step 9: Update Metadata (if applicable)
If there's a data-sources/metadata.json file:
- Read it
- Add or update entry for this source
- Write back updated metadata

### Step 10: Report Success
Provide a clear summary:
```
✓ Successfully updated app/data.ts

Changes applied:
- Added FY 2026-27 data
- Updated 4 data arrays
- Added new source reference

Verification steps:
1. Run: npm run build
   (This will catch any TypeScript errors)

2. Run: npm run dev
   (This will show the updated visualizations)

3. Check the charts for:
   - New 2026-27 data points
   - Trends look reasonable
   - No visual anomalies
```

## Error Handling
- If no data provided: Ask user to run `/parse-source` first or provide JSON
- If validation fails: Show warnings, ask user to review and confirm
- If Edit tool fails: Show error, suggest manual edit
- If year already exists: Ask user whether to UPDATE or skip
- If app/data.ts has syntax errors after edit: Show error, suggest manual fix

## Tools Available
- Read: Read app/data.ts and metadata
- Edit: Update app/data.ts (primary tool for applying changes)
- Write: Update metadata.json
- AskUserQuestion: Get user approval before making changes
- Bash: Run npm build for verification (optional)

## Best Practices
- Always show diff before applying changes
- Never make changes without user approval
- Preserve all existing formatting and comments
- Validate data thoroughly before updating
- Provide clear verification steps after changes
- If uncertain about any value, ask user to confirm

## Notes
- This skill is safe because it always asks for approval
- Changes are reversible via git if needed
- TypeScript compilation will catch structural errors
- Visual review in dev mode will catch data errors
