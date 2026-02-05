# Refresh All

## Description
Re-download and re-process all data sources from scratch (for reproducibility)

## Usage
```
/refresh-all
```

## Use Case
This is a **secondary workflow** for reproducibility. It re-downloads all sources from app/data.ts, parses them, and updates the data file. This is useful when:
- Verifying the dataset can be reproduced from sources
- Sources have been updated with corrections
- Starting fresh with a clean dataset

For adding new budget data, use `/add-source` instead.

## Instructions

When the user invokes this skill, follow these steps:

### Step 1: Confirm with User
- This is a potentially destructive operation (will update app/data.ts)
- Ask user to confirm they want to proceed
- Warn that this will re-download all sources and may take several minutes
- Suggest creating a git commit first if there are uncommitted changes

### Step 2: Download All Sources
- Invoke `/download-sources` skill OR run `npm run download-sources` directly
- Monitor progress
- Report download results:
  - Number of sources downloaded
  - Number of failures
  - Total time taken

### Step 3: List Downloaded Files
- Read data-sources/metadata.json
- Get list of successfully downloaded files
- Categorize by type (press releases, reports, archives, news)
- Report to user: "Processing X sources..."

### Step 4: Parse Each Source
For each successfully downloaded file:
1. Invoke `/parse-source <filename>` functionality (or inline)
2. Extract financial data
3. Validate extracted data
4. Store in aggregated results

Progress tracking:
- Show progress: "Parsing source 5 of 14: FY 2025-26 Adopted Budget..."
- Flag any parsing failures or warnings
- Continue with next source even if one fails

Collect all parsed data into aggregated structure:
```json
{
  "budgetData": [
    { year: "2020-21", ... },
    { year: "2021-22", ... },
    ...
  ],
  "adoptedBudgets": [ ... ],
  "enrollmentData": [ ... ],
  "sources": [ ... ]
}
```

### Step 5: Validate Aggregated Data
Cross-validate the complete dataset:
- Check year sequences (no gaps, no duplicates)
- Verify trends are reasonable (no huge jumps)
- Check consistency across arrays (same years in budgetData and adoptedBudgets)
- Flag any anomalies or warnings

### Step 6: Generate Comprehensive Diff
Show what will change in app/data.ts:
- For each data array, show:
  - Entries that will be added
  - Entries that will be updated
  - Entries that will be removed (if any)
- Provide summary statistics:
  - Total entries per array
  - Year range covered
  - Key changes highlighted

Example:
```
COMPREHENSIVE DIFF FOR app/data.ts:

budgetData:
  No changes (6 entries: 2020-21 to 2025-26)

adoptedBudgets:
  ~ UPDATE year 2024-25: deficit changed 52 → 51.9
  ~ UPDATE year 2025-26: source updated
  ✓ 6 entries (2020-21 to 2025-26)

enrollmentData:
  No changes (7 entries: 2019-20 to 2025-26)

sources:
  No changes (14 entries)

SUMMARY:
- Total arrays: 4
- Arrays with changes: 1 (adoptedBudgets)
- Total changes: 2 minor updates
- Years covered: 2019-20 to 2025-26
- Data integrity: ✓ All checks passed
```

### Step 7: Ask for User Approval
Use AskUserQuestion:
- Question: "Apply these changes to app/data.ts?"
- Show summary of changes
- Options:
  - "Yes, apply all changes"
  - "No, cancel - let me review"
  - "Show me detailed diff"
  - "Save parsed data to file for review"

### Step 8: Apply Updates (if approved)
If user approves:
1. Invoke `/update-data` with aggregated data
2. Update all relevant arrays in app/data.ts
3. Update sources array if needed
4. Update metadata.json

### Step 9: Verify Results
After updates applied:
1. Read app/data.ts to confirm changes
2. Run `npm run build` to verify TypeScript compiles
3. Report any compilation errors
4. Suggest running `npm run dev` to verify visualizations

### Step 10: Provide Summary Report
Generate final report:
```
✓ Refresh All Completed

Sources processed: 14
- Downloaded: 13 successful, 1 failed
- Parsed: 12 successful, 1 failed, 1 no data

Data updated:
- budgetData: 6 entries (2020-21 to 2025-26)
- adoptedBudgets: 6 entries (2020-21 to 2025-26)
- enrollmentData: 7 entries (2019-20 to 2025-26)
- sources: 14 entries

Changes applied:
- 2 updates to adoptedBudgets
- Minor corrections to deficit and source fields

Failures:
- FY 2021-22 Adopted Budget: Page not found (404)

Next steps:
1. Review failures and manually add if needed
2. Run: npm run build (to verify)
3. Run: npm run dev (to see results)
4. Commit changes if satisfied
```

## Error Handling
- If download fails completely: Abort and report error
- If some downloads fail: Continue with successful ones, report failures
- If parsing fails for a source: Log warning, continue with others
- If validation fails: Show warnings, ask user to review before applying
- If update fails: Show error, preserve original file

## Recovery
If something goes wrong:
- All changes are through Edit tool (user can see diffs)
- Suggest using git to revert if needed: `git checkout app/data.ts`
- Parsed data can be saved to file for later review
- Can re-run individual `/parse-source` on specific files

## Tools Available
- Bash: Run download script, build verification
- Read: Read app/data.ts, metadata, downloaded sources
- Edit: Update app/data.ts (via /update-data)
- Write: Save reports, interim results
- AskUserQuestion: Get approval before destructive operations
- Skill: Invoke /download-sources, /parse-source, /update-data as sub-skills

## Best Practices
- Always get user confirmation before starting
- Provide detailed progress updates (this takes time!)
- Continue processing even if some sources fail
- Show comprehensive diff before applying changes
- Validate thoroughly (this is rebuilding the entire dataset!)
- Give user chance to review at multiple checkpoints

## Notes
- This is a lengthy operation (several minutes)
- Not all sources may be available (URLs change, sites go down)
- Some manual intervention may be needed for complex sources
- The goal is reproducibility - proving the data can be regenerated from sources
- For routine updates, use `/add-source` instead
