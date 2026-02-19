# Parse Source

## Description
Parse a downloaded source file to extract financial data

## Usage
```
/parse-source <filename>
```

Example:
```
/parse-source data-sources/press-releases/fy-2025-26-adopted-budget.html
```

## Use Case
Parse individual downloaded source files to extract structured financial data. Part of the reproducibility workflow.

## Instructions

When the user invokes this skill with a filename, follow these steps:

### Step 1: Validate and Read File
- Check that filename argument is provided
- Use Read tool to read the file
- Handle different file types:
  - HTML files: Extract text content, tables, structured data
  - PDF files: Extract text, tables, figures
- If file doesn't exist, list available files in data-sources/ and ask user to pick one

### Step 2: Identify Source Type
Determine what kind of source this is:
- **Press Release**: SFUSD budget adoption announcements
  - Look for: budget total, deficit amount, fiscal year, key initiatives
- **Financial Report**: Detailed budget documents (often PDFs)
  - Look for: detailed revenue/expense tables, multi-year projections
- **Archive Page**: Historical budget listings
  - Look for: links to documents, summary tables
- **News Article**: External coverage
  - Look for: quoted figures, context, analysis
- **Data Table**: CDE or other statistical sources
  - Look for: enrollment figures, per-pupil spending, trends

### Step 3: Extract Financial Data
Based on source type, extract relevant data:

**For Budget Press Releases:**
- Fiscal year (e.g., "2026-27")
- Total budget amount (in millions)
- Deficit amount (in millions)
- Key revenue sources (LCFF, parcel tax, etc.)
- Enrollment projections
- Major cuts or additions
- Date of board adoption

**For Financial Reports:**
- Detailed revenue by source
- Detailed expenses by category
- Multi-year projections
- Fund balances
- Special education costs
- Enrollment trends

**For Enrollment/Statistical Data:**
- Enrollment by year
- Per-pupil spending
- Revenue per pupil
- Trends over time

**Extraction Tips:**
- Budget amounts are often in billions (convert to millions for consistency)
- Look for "adopted budget", "balanced budget", "structural deficit"
- Cross-reference multiple mentions to verify accuracy
- Note the date and source of information

### Step 4: Structure the Parsed Data
Create a structured JSON output matching app/data.ts format:

```json
{
  "sourceFile": "data-sources/press-releases/fy-2026-27-adopted-budget.html",
  "sourceType": "press-release",
  "confidence": "high|medium|low",
  "extractedData": {
    "budgetData": {
      "year": "2026-27",
      "totalBudget": 1250,
      "lcff": 670,
      "peef": 96,
      "parcelTax": 106,
      "enrollment": 47500,
      "deficit": 25,
      "esser": 0
    },
    "adoptedBudget": {
      "year": "2026-27",
      "budget": 1250,
      "deficit": 25,
      "source": "SFUSD Board press release, June 2026"
    },
    "enrollmentData": {
      "year": "2026-27",
      "enrollment": 47500,
      "perPupil": 26316
    }
  },
  "notes": "Budget and deficit explicitly stated in headline. Enrollment mentioned in body. LCFF and parcel tax figures from revenue breakdown table.",
  "warnings": []
}
```

### Step 5: Validate Extracted Data
Check data quality:
- **Budget**: Should be 1000-1500 (millions) for SFUSD
- **Deficit**: Should be 0-150 (millions) typically
- **Enrollment**: Should be 45,000-52,000 for recent years
- **Year format**: Must be "YYYY-YY" (e.g., "2026-27")
- **LCFF**: Should be 500-700 (millions) typically
- **Per-pupil**: Should be 20,000-30,000 (dollars)

Add warnings for:
- Values outside typical ranges
- Missing expected fields
- Inconsistent data (e.g., per-pupil doesn't match budget/enrollment)

Assign confidence level:
- **high**: All key fields found explicitly stated
- **medium**: Some fields inferred or calculated
- **low**: Limited data available, multiple assumptions made

### Step 6: Output Results
Display the structured JSON to the user in a clear format:
- Show the extracted data by category (budgetData, adoptedBudgets, etc.)
- Highlight confidence level
- Show any warnings or notes
- Indicate which data arrays in app/data.ts this would update

### Step 7: Suggest Next Steps
Based on the parsed data, suggest:
- If confidence is high: "Ready to update app/data.ts using `/update-data`"
- If confidence is medium/low: "Please review the extracted data and make corrections"
- If data is incomplete: "Some fields missing - you may need to manually add them"

Optionally offer to:
- Save the JSON to a file for review
- Proceed directly to `/update-data` with this data

## Error Handling
- If file not found: List available files in data-sources/
- If parsing fails: Show raw content snippet, ask for manual input
- If no data extracted: Report and suggest manual review of source
- If data validation fails: Show warnings, ask user to verify

## Tools Available
- Read: Read downloaded source files and metadata
- Write: Optionally save parsed JSON to file
- Bash: List available source files if needed

## Output Format
Always output well-formatted JSON that can be:
1. Reviewed by the user
2. Passed directly to `/update-data` skill
3. Saved to a file for later use

## Notes
- Use Claude's multimodal capabilities to read PDFs and extract tables
- Be conservative - better to flag uncertain data than make wrong assumptions
- Cross-reference multiple mentions of same figure to verify accuracy
- If source contains multiple years of data, extract all years
- Preserve source attribution (which document, which section)
