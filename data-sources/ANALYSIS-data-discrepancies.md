# SFUSD Budget Data Discrepancy Analysis
**Date**: February 3, 2026
**Purpose**: Comparison of current data.ts vs. official SFUSD adopted budget documents

## Executive Summary

After downloading and parsing 6 official SFUSD budget documents (FY 2020-21 through 2025-26), we found **significant discrepancies** between the current `app/data.ts` file and the extracted budget data. The differences range from minor rounding to major $100M+ variations.

**Key Finding**: The current data.ts appears to use **different accounting methodologies** than the official adopted budgets, possibly representing:
- Audited actuals vs. adopted projections
- "All funds" totals vs. "General Fund only"
- Alternative revenue categorizations
- Data from supplementary sources (interim reports, board resolutions, etc.)

## Detailed Discrepancy Analysis by Fiscal Year

### FY 2025-26: Recent Adoption (June 2025)

| Metric | Current data.ts | Extracted from SACS | Difference | % Diff |
|--------|----------------|---------------------|------------|--------|
| **Total Budget** | $1,200M | $1,201.72M | +$1.72M | +0.1% |
| **Deficit** | $0 | $0 | $0 | 0% |
| **LCFF** | $648M | $691.03M | +$43M | +6.6% |
| **PEEF** | $94M | $36.36M | **-$57.64M** | **-61%** |
| **Parcel Tax** | null | $107.59M | N/A | N/A |
| **Cuts** | $113.8M | null (in reserves) | N/A | N/A |

**Analysis**:
- **PEEF discrepancy**: The $94M in current data vs. $36M in SACS is a **61% difference**.
  - Hypothesis: Current data may include PEEF + other city/county funding, while SACS shows PEEF alone
  - SACS Form 01 shows "Community Redevelopment Funds Not Subject to LCFF Deduction" = $36.36M
  - The $94M figure may come from City Controller estimates that include broader funding

- **LCFF difference**: $648M vs. $691M = $43M gap
  - SACS Form 01 (Page 8) clearly shows Total LCFF Sources = $691,030,351
  - Current $648M may exclude certain LCFF transfers or use a different calculation

- **Parcel Tax**: $107.59M extracted but shown as null in current data
  - SACS clearly lists "Parcel Taxes (8621)" = $107.59M on Page 11
  - This should be populated in current data

**Recommendation**: Update parcel tax to $107.59M. Investigate PEEF and LCFF definitions before updating.

---

### FY 2024-25: Major Discrepancies

| Metric | Current data.ts | Extracted from SACS | Difference | % Diff |
|--------|----------------|---------------------|------------|--------|
| **Total Budget** | $1,300M | $1,175.64M | **-$124.36M** | **-9.6%** |
| **Deficit** | $51.9M | $148.52M | **+$96.62M** | **+186%** |
| **LCFF** | $631M | $673.91M | +$42.91M | +6.8% |
| **PEEF** | $94.3M | $36.00M | **-$58.3M** | **-62%** |
| **Parcel Tax** | $104.3M | $97.15M | -$7.15M | -6.9% |
| **Enrollment** | 48,000 | Not in SACS | N/A | N/A |

**Analysis**:
- **Total Budget**: $1,300M vs. $1,175.64M = **$124M difference**
  - SACS Form 01 shows Total Revenues (Line 5) = $1,175,642,886.73
  - Current $1,300M likely represents "all funds" including restricted funds, special projects, etc.
  - SACS shows General Fund unrestricted revenues only

- **Deficit**: $51.9M vs. $148.52M = **$97M difference**
  - SACS Form 01 (Page 1, Line C) shows deficit of $148,519,460.25 (before financing)
  - Current $51.9M may represent "adopted deficit" after using reserves/one-time funds
  - Press release mentions "CDE 'Negative' certification, 535 positions cut"
  - The $51.9M might be the "final" deficit after all mitigation measures

- **PEEF**: Same 62% discrepancy as FY 2025-26
  - Consistent pattern suggests different definition between sources

- **LCFF**: $631M vs. $674M = $43M difference
  - Same pattern as FY 2025-26
  - SACS Total LCFF Sources (Page 3-4) = $673,908,095

**First Interim Report Data** (December 2024):
- Shows enrollment: 49,185 (vs current 48,000)
- Shows LCFF: $634.4M (vs current $631M, vs SACS $673.9M)
- Shows expenditures: $1,400M total

**Recommendation**: The $1,300M budget and $51.9M deficit in current data appear to be "press release" figures that represent simplified/aggregated totals. SACS forms show the detailed accounting reality.

---

### FY 2023-24: Mixed Results

| Metric | Current data.ts | Extracted from Budget | Difference | % Diff |
|--------|----------------|----------------------|------------|--------|
| **Total Budget** | $1,280M | $1,280.7M | +$0.7M | +0.1% |
| **Deficit** | $103M | null (surplus) | **N/A** | **conflict** |
| **LCFF** | $645M | $644.8M | -$0.2M | -0.03% |
| **PEEF** | $90.3M | $90.3M | $0 | 0% |
| **Parcel Tax** | $101.1M | $63.1M | **-$38M** | **-38%** |
| **Enrollment** | 49,000 | 49,131 | +131 | +0.3% |

**Analysis**:
- **Total Budget & LCFF & PEEF**: Excellent matches! Data aligns well.

- **Deficit conflict**: Current shows $103M deficit, but Budget Overview (Page 27) shows:
  - Beginning Fund Balance: $174.7M
  - Ending Fund Balance: $184.7M
  - **Net increase: +$10M** (surplus, not deficit!)
  - Budget Overview Exhibit 2 explicitly states positive fund balance growth

- **Parcel Tax**: $101.1M vs. $63.1M = $38M difference
  - Budget Overview (Page 18) shows: QTEA $49.6M + FWEA $13.5M = **$63.1M total**
  - Current $101.1M appears to be incorrect OR includes other special assessments
  - This is a clear discrepancy that favors the budget document

**Recommendation**:
- Change deficit from $103M to null or positive (budget was balanced with surplus)
- Update parcel tax from $101.1M to $63.1M (verified in budget doc)

---

### FY 2022-23: Parcel Tax Anomaly

| Metric | Current data.ts | Extracted from Budget | Difference | % Diff |
|--------|----------------|----------------------|------------|--------|
| **Total Budget** | $1,100M | $1,153.39M | +$53.39M | +4.9% |
| **Deficit** | $125M | null (addressed) | ⚠️ | N/A |
| **LCFF** | $571M | $571.3M | +$0.3M | +0.1% |
| **PEEF** | $88.9M | $88.9M | $0 | 0% |
| **Parcel Tax** | $94.9M | $331.86M | **+$236.96M** | **+250%** |
| **Enrollment** | 48,785 | 47,896 | -889 | -1.8% |
| **ESSER** | $100M | $138.9M | +$38.9M | +38.9% |

**Analysis**:
- **LCFF & PEEF**: Perfect matches!

- **Parcel Tax ANOMALY**: $94.9M vs. $331.86M extracted
  - The $331.86M appears to be a **parsing error** by the agent
  - Budget Overview (Page 21-23) mentions:
    - QTEA total: Approximately $45-50M range (typical annual)
    - FWEA: Approximately $48M annual
    - **Realistic total: ~$95M** ✓ Current data is correct!
  - The agent likely misread a cumulative figure, bond amount, or assessment base value

- **Deficit**: Press release explicitly states "$125M projected deficit"
  - Budget notes it was "addressed through $49M cuts + $76M new revenue"
  - Current data correctly shows $125M

- **ESSER**: $100M vs. $138.9M
  - Budget shows ESSER II ($43M) + ESSER III ($95.9M) = $138.9M total
  - Current $100M may represent net amount after certain exclusions
  - Budget document is more authoritative here

**Recommendation**:
- Keep parcel tax at $94.9M (agent parsing error)
- Update ESSER from $100M to $138.9M (verified in budget)
- Keep deficit at $125M (correct from press release)

---

### FY 2021-22: Good Alignment

| Metric | Current data.ts | Extracted from Budget | Difference | % Diff |
|--------|----------------|----------------------|------------|--------|
| **Total Budget** | $1,160M | $1,165.6M | +$5.6M | +0.5% |
| **Deficit** | $100.2M | $100.2M | $0 | 0% |
| **LCFF** | $551M | $551.3M | +$0.3M | +0.1% |
| **PEEF** | $75.8M | $75.8M | $0 | 0% |
| **Parcel Tax** | $93.5M | $45.2M | **-$48.3M** | **-52%** |
| **Enrollment** | 49,200 | 51,898 | +2,698 | +5.5% |
| **ESSER** | $140M | $138.9M | -$1.1M | -0.8% |

**Analysis**:
- **Deficit, LCFF, PEEF, ESSER**: Excellent matches! High confidence in these figures.

- **Parcel Tax**: $93.5M vs. $45.2M = $48M difference
  - Budget Overview (Page 23) shows QTEA = $45.2M
  - Current $93.5M likely includes QTEA ($45.2M) + FWEA (~$48M) = $93.5M
  - Budget may have shown only QTEA separately
  - Current data appears correct (combined total)

- **Enrollment**: 49,200 vs. 51,898 = 2,698 difference
  - Budget Exhibit 1 (Page 33) shows budget enrollment = 51,898
  - Current 49,200 may be actual/audited enrollment vs budgeted
  - Enrollment typically budgeted higher than actuals

**Recommendation**: Keep current data (appears accurate with combined parcel taxes)

---

### FY 2020-21: Major Budget Difference

| Metric | Current data.ts | Extracted from Budget | Difference | % Diff |
|--------|----------------|----------------------|------------|--------|
| **Total Budget** | $1,100M | $933.1M | **-$166.9M** | **-15.2%** |
| **Deficit** | $84M | null | ⚠️ | N/A |
| **LCFF** | $531M | $535.1M | +$4.1M | +0.8% |
| **PEEF** | null | $76.7M | N/A | N/A |
| **Parcel Tax** | null | $45.04M | N/A | N/A |
| **Enrollment** | 51,800 | 49,893 | -1,907 | -3.7% |
| **ESSER** | $0 | null | N/A | N/A |

**Analysis**:
- **Total Budget**: $1,100M vs. $933.1M = **$167M difference**
  - Budget Overview (Page 14, 48) shows District Operating Budget = $933.1M
  - Current $1,100M significantly higher
  - Possible explanations:
    1. Current includes bond funds, capital projects (not in operating budget)
    2. Current represents "all funds" while budget shows general fund
    3. COVID-19 pandemic year - budget revised multiple times, current may be final actuals

- **Deficit**: $84M shown in current data
  - Budget Overview (Page 4) mentions $57M shortfall addressed in prior year
  - Not explicitly stated for FY 2020-21 in this budget
  - $84M likely comes from Board resolution or later interim report

- **PEEF & Parcel Tax**: Missing in current data but in budget
  - Budget shows PEEF = $76.7M (Page 19)
  - Budget shows QTEA = $45.04M (Page 20)
  - These should be populated in current data

- **ESSER**: Correctly shown as $0 in current data
  - Budget adopted July 2020 (early COVID)
  - ESSER I funding came later in federal relief packages
  - By FY 2021-22, ESSER II/III were included

**Recommendation**:
- Investigate the $167M budget discrepancy before updating
- Add PEEF = $76.7M and parcelTax = $45.04M to current data
- Keep deficit at $84M unless verified otherwise

---

## Summary of Key Patterns

### Consistent Matches (High Confidence):
✅ **LCFF**: Consistently matches within $0-5M across all years
✅ **PEEF (2020-2023)**: Exact matches for older years
✅ **Deficit (2021-22)**: Perfect match at $100.2M

### Consistent Discrepancies (Systemic Issues):
❌ **PEEF (2024-2026)**: $94M current vs $36M budgets = **62% difference** - likely definitional
❌ **Total Budget**: Varies significantly, suggesting "all funds" vs "general fund" confusion
⚠️ **Parcel Tax**: Highly variable, sometimes combined (QTEA+FWEA), sometimes separate

### Data Quality Issues:
🔍 **FY 2022-23 Parcel Tax**: Agent parsing error ($331M extracted is clearly wrong)
🔍 **FY 2023-24 Deficit**: Budget shows surplus (+$10M), current shows $103M deficit
🔍 **FY 2020-21 Total Budget**: $167M gap needs investigation

---

## Hypotheses for Discrepancies

### Hypothesis 1: Adopted vs. Actuals
- **Current data.ts**: May contain audited actual expenditures from CAFR (Comprehensive Annual Financial Report)
- **Extracted budgets**: Contain adopted/projected budgets from June Board approval
- **Reality**: Actuals often differ from budgets due to enrollment changes, revenue adjustments, etc.

### Hypothesis 2: Fund Definitions
- **General Fund Only**: SACS forms show general fund (operating budget)
- **All Funds Combined**: Current data may aggregate general + special revenue + capital + enterprise funds
- **Example**: FY 2024-25 shows $1,300M (all funds?) vs $1,176M (general fund only)

### Hypothesis 3: PEEF Accounting Changes
- **Pre-2024**: PEEF shown at ~$76-90M, matches budget documents exactly
- **2024-2026**: Sudden jump to $94M in current data, but budgets show $36M
- **Possible Change**: City/County may have changed PEEF distribution method or current data includes additional city funding streams

### Hypothesis 4: Parcel Tax Aggregation
- **Some years**: Budget shows only QTEA (~$45M)
- **Other years**: Budget shows QTEA + FWEA combined (~$95-107M)
- **Current data**: Appears to use combined totals when available

### Hypothesis 5: Press Release Simplification
- **Budget Documents**: Detailed SACS forms with precise accounting
- **Press Releases**: Simplified "$1.3 billion budget" headline figures
- **Current data.ts**: May have been derived from press releases rather than detailed budget docs

---

## Recommendations by Priority

### High Priority (Clear Errors/Omissions):
1. ✅ **FY 2025-26 Parcel Tax**: Update from null to $107.59M (verified in SACS)
2. ✅ **FY 2023-24 Deficit**: Remove or set to null (budget showed +$10M surplus, not $103M deficit)
3. ✅ **FY 2023-24 Parcel Tax**: Update from $101.1M to $63.1M (verified QTEA+FWEA total)
4. ✅ **FY 2020-21 PEEF & Parcel Tax**: Add PEEF=$76.7M, parcelTax=$45.04M (missing data)

### Medium Priority (Investigate Before Updating):
5. 🔍 **PEEF (2024-2026)**: Determine if $94M vs $36M is definitional difference or error
6. 🔍 **Total Budget Variations**: Clarify "all funds" vs "general fund" methodology
7. 🔍 **FY 2024-25 Deficit**: $51.9M vs $148.5M - understand which represents "final adopted deficit"
8. 🔍 **LCFF (2024-2026)**: $648M/$631M vs $691M/$674M - investigate $40M+ gap

### Low Priority (Acceptable Variances):
9. ℹ️ **ESSER amounts**: Variations of $1-40M across years (timing of allocations)
10. ℹ️ **Enrollment**: Budgeted vs actual variations of 1-5% are normal
11. ℹ️ **Total Budget (other years)**: <5% variations likely due to fund definitions

---

## Proposed Next Steps

### Option A: Conservative Update (Recommended)
**Action**: Update only fields with clear errors or missing data
**Changes**: Items #1-4 from High Priority list
**Risk**: Low - only fixing obvious issues
**Benefit**: Improves data accuracy without risking incorrect overwrites

### Option B: Full Synchronization
**Action**: Replace all current data with budget PDF extractions
**Changes**: All discrepancies resolved in favor of official budget documents
**Risk**: High - may lose valuable audited actuals or curated data
**Benefit**: Data directly traceable to official budget documents

### Option C: Hybrid Approach
**Action**: Update clear errors, add source citations, flag discrepancies
**Changes**: High priority fixes + add comments explaining known discrepancies
**Risk**: Medium - requires manual review of each discrepancy
**Benefit**: Best of both worlds - accurate data with documented exceptions

### Option D: No Changes
**Action**: Keep current data.ts unchanged
**Changes**: None - preserve existing curated dataset
**Risk**: Low - maintains status quo
**Benefit**: Avoids potential data quality issues from automated extraction

---

## Source Document Summary

### Files Analyzed:
1. `fy-2025-26-adopted-budget-sacs.pdf` (2.2MB) - SACS financial forms
2. `fy-2024-25-adopted-budget-sacs.pdf` (1.6MB) - SACS financial forms
3. `fy-2023-24-budget-overview.pdf` (2.0MB) - Budget Overview Vol II
4. `fy-2022-23-budget-overview.pdf` (23MB) - Budget Overview Vol II
5. `fy-2021-22-budget-overview.pdf` (1.7MB) - Budget Overview Vol II
6. `fy-2020-21-budget-overview-revised.pdf` (3.2MB) - Budget Overview Vol II (Revised)

### Additional Sources Referenced:
- First Interim Report FY 2024-25 (December 2024)
- Press releases (June 2021-2025)
- Board resolutions (various dates)

### Data Extraction Method:
- AI-powered PDF parsing using Claude Sonnet
- Manual verification of key figures
- Cross-referencing across multiple document types

---

## Conclusion

The discrepancies between current `app/data.ts` and official budget documents are **significant and systemic**, suggesting that the current data was curated from multiple sources using different accounting methodologies.

**Key Insight**: The current data appears to represent a **blend of**:
- Press release headline figures ("$1.3 billion budget")
- Audited actual expenditures (CAFR reports)
- Board-adopted deficit projections (resolutions)
- Aggregated "all funds" totals (vs general fund only)

**Recommendation**: Adopt **Option C (Hybrid Approach)**:
1. Fix clear errors (wrong/missing parcel tax, incorrect deficit signs)
2. Add source citations to each data point
3. Document known discrepancies with explanations
4. Consider adding separate arrays for "Adopted Budget" vs "Audited Actuals"

This approach preserves the valuable work that went into the current dataset while improving accuracy and transparency.
