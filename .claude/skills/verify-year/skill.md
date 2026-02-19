# Verify Year

## Description
Verify a single fiscal year's budget data from app/data.ts against official source documents, checking both adopted budget and estimated actuals.

## Usage
```
/verify-year <year>
```

Example:
```
/verify-year 2023-24
```

## Use Case
Generate a comprehensive markdown report showing field-by-field comparisons between data.ts, adopted budget documents, and estimated actuals (from following year's SACS), with source citations and actionable recommendations.

## Instructions

When the user invokes this skill with a fiscal year, follow these steps:

### Step 1: Validate Arguments
- Parse year argument (format: "YYYY-YY", e.g., "2023-24")
- Calculate following year for estimated actuals (e.g., "2024-25" for 2023-24's actuals)
- Validate year format matches "YYYY-YY" pattern
- If no year provided or invalid format, show available years and exit

### Step 2: Read data.ts Entry
- Use Read tool to load `/Users/sbuss/workspace/sfusd-finances/app/data.ts`
- Extract entry from `budgetData` array for the specified year
- Store all field values: `totalBudget`, `lcff`, `peef`, `parcelTax`, `enrollment`, `structuralDeficit`, `deficitAfterOneTime`, `oneTimeFunds`, `oneTimeReserves`, `esser`, `cuts`
- Also check `esserFunding` array for detailed ESSER breakdown
- If year not found in data.ts, list available years and exit with error

### Step 3: Locate Source PDFs
**Adopted Budget Document:**
- Path: `data-sources/budget-pdfs/fy-{year}-budget-overview.pdf`
- Example: `data-sources/budget-pdfs/fy-2023-24-budget-overview.pdf`
- Contains: Original budget as adopted by Board

**Estimated Actuals Document (CRITICAL):**
- Path: `data-sources/budget-pdfs/fy-{following-year}-adopted-budget-sacs.pdf`
- Example: For FY 2023-24 actuals → `data-sources/budget-pdfs/fy-2024-25-adopted-budget-sacs.pdf`
- Contains: FY 2023-24 estimated actuals in **LEFT COLUMN** labeled "2023-24 Estimated Actuals"
- Key pages: Form 01 pages 6-13 (revenue, expenditure, fund balance)

**File existence check:**
- Use Bash tool to check if both PDFs exist
- If either missing, warn user but continue with available sources
- Track which sources are available for the report

### Step 4: Extract from Adopted Budget PDF
**Use Read tool to extract from Budget Overview (pages 1-40):**

**Target fields and typical locations:**
- **Total Budget**: Executive summary (pages 1-5) or revenue/expenditure tables
- **LCFF** (lines 8010-8099): Revenue tables, typically pages 15-25
- **Parcel Tax**: Local revenue section
  - QTEA (Proposition A): Look for "Quality Teacher" or resource 8621
  - FWEA (Proposition J): Look for "Fair Wages" or resource 8621
  - Sum both for total parcel tax
  - Note: May be split between unrestricted and restricted funds
- **PEEF**: Local revenue narrative or "Other Local" section (resource 8622/8697/8699)
- **ESSER**: Federal revenue section or detailed Exhibits
  - Look for ESSER I, II, III breakdowns
  - Check Exhibits (typically pages 25-40) for detailed resource codes
- **Enrollment**: Projections section or executive summary
- **Structural Deficit**: Narrative statements, executive summary, or board resolution language

**Extraction notes:**
- Budget amounts may be in different units (thousands, millions, billions) - standardize to millions
- Cross-reference multiple mentions to verify accuracy
- Note page numbers and exhibit numbers for all extracted values

### Step 5: Extract from SACS Estimated Actuals PDF
**Use Read tool to extract from SACS Form 01 (pages 6-13):**

**CRITICAL: Read the LEFT COLUMN labeled with the prior year (e.g., "2023-24 Estimated Actuals")**

**SACS line items (Form 01):**
- **Line 8010-8099**: LCFF Sources (total from multiple sub-lines)
- **Line 8621**: Parcel Taxes (may appear in both unrestricted and restricted sections - sum both)
- **Line 8622/8697/8699**: Other Local Revenue (includes PEEF)
- **Line 8290**: Federal Revenue (includes ESSER in restricted section)
- **Total Revenues**: Sum of unrestricted + restricted revenues
- **Total Expenditures**: From expenditure section
- **Enrollment**: From certification pages or data summary

**Special handling:**
- SACS uses thousands (÷1000 to convert to millions for comparison)
- Parcel tax may be split: unrestricted (General Fund) + restricted (Special Revenue)
  - Check both Form 01 unrestricted section and Form 01 restricted section
  - Sum both values for total parcel tax
- ESSER is ALWAYS in restricted federal revenue (line 8290 in restricted section)
- PEEF may be aggregated in "Other Local" - may require estimate or notation

**Extraction notes:**
- Verify you're reading the correct column (prior year, not current year)
- Note specific line numbers for all extracted values
- Flag if estimated actuals differ significantly from adopted (normal year-over-year adjustments)

### Step 6: Perform Three-Way Comparison
For each field in data.ts, create comparison:

**Comparison structure:**
1. **data.ts value** (current)
2. **Adopted Budget value** (original plan)
3. **Estimated Actuals value** (what actually happened)

**Calculate variance:**
- Absolute difference in millions
- Percentage difference
- Status indicator (see Step 7)

**Derived metrics:**
- Per-pupil spending: totalBudget ÷ enrollment
- Revenue per pupil: (totalBudget - deficit) ÷ enrollment
- LCFF per pupil: lcff ÷ enrollment

**Cross-checks:**
- Does ESSER in budgetData match esserFunding array total?
- Does oneTimeFunds ≥ esser (ESSER should be subset)?
- Does deficitAfterOneTime = structuralDeficit - oneTimeFunds (approximately)?

### Step 7: Assign Status Indicators
For each field comparison, assign status:

**Status thresholds:**
- ✅ **Match**: Within 2% OR within $2M (whichever is larger)
- ⚠️ **Warning**: Within 10% OR within $10M (needs investigation)
- ❌ **Error**: Differs by >10% AND >$10M (needs correction)
- **N/A**: Not available in source document

**Investigate discrepancies by checking common causes:**

1. **Unrestricted vs Total Fund Accounting**
   - Does budget show only unrestricted but data.ts includes restricted?
   - Example: Parcel tax split between funds

2. **Allocation vs Annual Budget**
   - Is this total allocation across years vs single-year budget?
   - Example: ESSER $138.9M total allocation vs $26M annual budget

3. **Adopted vs Actuals Variance**
   - Are differences due to projections vs reality?
   - Example: 49,000 projected enrollment vs 48,700 actual

4. **Rounding Differences**
   - Press releases: "$1.3 billion"
   - Official docs: "$1,280M"

5. **Definition Differences**
   - "Structural deficit" vs "budget deficit" vs "adopted deficit"
   - May require interpretation or calculation

**For each discrepancy:**
- Identify likely cause from above list
- Note in report with explanation
- Recommend action (update, investigate, clarify definition)

### Step 8: Generate Markdown Verification Report
**Create file:** `data-sources/VERIFICATION-{year}.md`

**Report structure:**

```markdown
# Budget Data Verification Report: FY {year}
**Generated**: {current date}
**Verification Status**: [✅ All Match | ⚠️ Warnings Found | ❌ Critical Issues]

---

## Executive Summary

**Overall Assessment:**
- X fields verified
- Y critical issues found (❌)
- Z warnings requiring investigation (⚠️)
- W fields match perfectly (✅)

**Critical Issues Requiring Immediate Action:**
{List each ❌ item with brief description}

**Sources Analyzed:**
- Adopted Budget: [filename or N/A]
- Estimated Actuals: [filename or N/A]

---

## Field-by-Field Verification

### 1. Total Budget

| Source | Amount | Variance from data.ts | Status |
|--------|--------|----------------------|--------|
| **data.ts** | ${value}M | - | - |
| **Adopted Budget** | ${value}M | ±${diff}M ({pct}%) | {status} |
| **Estimated Actuals** | ${value}M | ±${diff}M ({pct}%) | {status} |

**Analysis:**
{Detailed explanation of findings, discrepancies, likely causes}

**Source Citations:**
- Adopted: {Document name, Page X, Exhibit Y, Line Z}
- Actuals: {SACS Form 01, Page X, Line Y, Column "YYYY-YY Estimated Actuals"}

**Recommendation:** {Action to take}
**Confidence:** {⭐⭐⭐⭐⭐ to ⭐}

---

{Repeat for: LCFF, PEEF, Parcel Tax, Enrollment, ESSER, Structural Deficit,
 Deficit After One-Time, One-Time Funds, One-Time Reserves, Cuts}

---

## Derived Metrics Verification

### Per-Pupil Spending

| Calculation | Value | Status |
|-------------|-------|--------|
| data.ts (totalBudget ÷ enrollment) | ${value} | - |
| Adopted Budget | ${value} | {status} |
| Estimated Actuals | ${value} | {status} |

{Analysis and source citations}

---

## Discrepancies Found

### Critical (❌)
{List each critical issue with:}
- **Field**: {field name}
- **Issue**: {description}
- **Impact**: {why this matters}
- **Recommendation**: {specific action}
- **Confidence**: {⭐⭐⭐⭐⭐}

### Warnings (⚠️)
{List each warning with same structure}

### Matches (✅)
{Brief summary of fields that matched perfectly}

---

## Source Document Details

### Adopted Budget Overview
- **Filename**: {full path}
- **Pages Analyzed**: {list}
- **Key Exhibits**: {list}
- **Extraction Success**: {X of Y fields found}

### SACS Estimated Actuals
- **Filename**: {full path}
- **Form**: Form 01 (General Fund)
- **Column**: "{YYYY-YY} Estimated Actuals" (LEFT)
- **Pages Analyzed**: {list}
- **Extraction Success**: {X of Y fields found}

---

## Recommendations

### Immediate Actions (High Confidence ⭐⭐⭐⭐⭐)
1. {Action item with specific field and value change}
2. {Action item}

### Investigate Before Changing (Medium Confidence ⭐⭐⭐)
1. {Investigation needed with what to look for}
2. {Investigation needed}

### Clarify Definitions (Low Confidence ⭐⭐)
1. {Definition question with what to resolve}

---

## Methodology Notes

### Verification Process
1. Extracted data.ts values for FY {year}
2. Read adopted budget from: {filename}
3. Read estimated actuals from: {filename}
4. Performed three-way comparison for all fields
5. Investigated discrepancies against common patterns
6. Assigned confidence levels based on source clarity

### Confidence Level Guide
- ⭐⭐⭐⭐⭐ **Very High**: Direct line-item from SACS or budget exhibit
- ⭐⭐⭐⭐ **High**: Stated explicitly in budget narrative
- ⭐⭐⭐ **Medium**: Inferred from multiple sources or calculated
- ⭐⭐ **Low**: Conflicting sources or unclear methodology
- ⭐ **Very Low**: Cannot verify from available documents

### Known Limitations
- {Any missing documents}
- {Any fields that couldn't be extracted}
- {Any assumptions made}

---

## Appendix: Extraction Details

### Budget Overview Extraction
**Page-by-page findings:**
- Pages 1-5: {what was found}
- Pages 15-25: {what was found}
- Exhibits: {what was found}

### SACS Form 01 Extraction
**Line-by-line findings:**
- Line 8010-8099 (LCFF): {value}
- Line 8621 (Parcel Tax): {value unrestricted} + {value restricted}
- Line 8290 (Federal): {value}
{etc.}

---

*This verification report provides field-by-field comparison of FY {year} budget data
against official SFUSD documents. All recommendations should be reviewed by a human
before updating data.ts.*
```

### Step 9: Error Handling
**Handle gracefully:**

1. **Missing PDFs:**
   - Warn: "Adopted budget PDF not found at {path}"
   - Continue with available sources
   - Mark unavailable fields as "N/A - Source Missing"
   - Note limitation in report

2. **Year not in data.ts:**
   - List available years from budgetData array
   - Exit with helpful error message
   - Don't generate partial report

3. **PDF reading fails:**
   - Try reading smaller page ranges (e.g., 1-10, 11-20)
   - If specific pages fail, note which pages couldn't be read
   - Continue with successfully read pages
   - Mark failed extractions as "Not Found - PDF Read Error"

4. **Field extraction fails:**
   - Mark field as "Not Found - Manual Review Needed"
   - Continue with other fields
   - Recommend manual verification in report
   - Note which extraction method was attempted

5. **SACS column confusion:**
   - If unsure which column is prior year, check column headers carefully
   - LEFT column should have format "YYYY-YY Estimated Actuals"
   - If ambiguous, note in report and mark fields with lower confidence

### Step 10: Display Summary to User
**After generating report, output to user:**

```
{Status indicator} Verification complete for FY {year}

Summary:
- {X} fields verified
- {Y} critical issues found (❌)
- {Z} warnings requiring investigation (⚠️)
- {W} fields match perfectly (✅)

{If critical issues exist:}
Critical Issues:
❌ {Field}: {brief description of issue}
❌ {Field}: {brief description of issue}

{If warnings exist:}
Warnings:
⚠️ {Field}: {brief description}

Report saved to: data-sources/VERIFICATION-{year}.md

Next steps:
1. Review detailed verification report
2. {Specific action if high-confidence issue found}
3. {Investigation needed if warnings exist}
```

**Status indicator logic:**
- ✅ if no critical issues or warnings
- ⚠️ if warnings but no critical issues
- ❌ if any critical issues found

### Step 11: Handle Common SACS Patterns
**When reading SACS forms, be aware of:**

**Fund structure in Form 01:**
- **Unrestricted General Fund** (first section, pages ~6-9)
  - LCFF appears here (8010-8099)
  - Some parcel tax (8621)
  - Some local revenue (8622/8697/8699)

- **Restricted General Fund** (second section, pages ~10-13)
  - Federal revenue including ESSER (8290)
  - Some parcel tax (8621) - restricted portion
  - State categorical programs

**Total parcel tax = unrestricted 8621 + restricted 8621**

**Common line items:**
- 8011-8019: LCFF State Aid
- 8012: Property Taxes (LCFF)
- 8096: Other LCFF
- 8290: Federal Revenue (check detail for ESSER)
- 8621: Parcel Taxes
- 8622/8697/8699: Other Local Revenue (may include PEEF)

**Reading SACS correctly:**
1. Identify the correct column (prior year actuals)
2. Read unrestricted section first
3. Read restricted section second
4. Sum across both sections where applicable
5. Convert from thousands to millions (÷1000)

### Step 12: Document Common Discrepancy Patterns
**Include in report when relevant:**

**Pattern 1: ESSER Allocation vs Annual Budget**
- Total ESSER III allocation: $95.9M (2021-2024)
- FY 2023-24 annual budget: $26M
- If data.ts shows higher number, it may be:
  - Total allocation instead of annual
  - Carryover from prior years
  - Multiple grant years combined

**Pattern 2: Parcel Tax Fund Split**
- QTEA + FWEA may total $100M+
- But only $60M in unrestricted fund
- Remaining $40M in restricted fund
- data.ts should reflect TOTAL, not just unrestricted

**Pattern 3: Structural Deficit Definitions**
- "Budget deficit" (before solutions): e.g., $125M
- "Structural deficit" (ongoing gap): e.g., $225M
- "Adopted deficit" (after one-time funds): e.g., $0
- Verify which definition data.ts uses

**Pattern 4: Enrollment Variance**
- Adopted budget: 49,000 (projected)
- Estimated actuals: 48,700 (actual)
- Small differences (1-5%) are normal
- Use actuals when available

**Pattern 5: Rounding in Press Releases**
- Press release: "$1.3 billion budget"
- Official budget: "$1,280M"
- SACS: "$1,279.8M"
- All are correct, just different precision

## Error Handling Summary
- Missing PDFs → Warn and continue with available sources
- Year not in data.ts → List available years and exit
- PDF reading fails → Try smaller page ranges, mark failures
- Field extraction fails → Mark "Not Found - Manual Review Needed"
- Ambiguous data → Note in report with lower confidence

## Tools Available
- **Read**: Read data.ts, PDFs, and generated report
- **Write**: Create verification report markdown file
- **Bash**: Check file existence, list available PDFs

## Output Format
Always generate a comprehensive markdown report with:
1. Executive summary (critical issues up front)
2. Field-by-field detailed analysis
3. Source citations with specific page/line numbers
4. Confidence levels for all recommendations
5. Actionable next steps
6. Methodology notes for reproducibility

## Notes
- This skill does NOT modify data.ts - only generates verification reports
- User reviews report and then manually updates data.ts or uses `/update-data` skill
- SACS column labeling is critical: LEFT column = prior year estimated actuals
- Parcel tax verification is complex due to unrestricted/restricted fund split
- ESSER is always in restricted federal revenue, never in unrestricted
- Structural deficit interpretation often requires understanding of district's methodology
- Always cite sources with exact page numbers and line items for reproducibility
- Three-way comparison (data.ts vs adopted vs actuals) provides highest confidence
- Estimated actuals (from following year SACS) are often more accurate than adopted budget
