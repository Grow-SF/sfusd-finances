# ESSER Verification Report - Cross-Referenced Sources
**Date**: February 4, 2026
**Purpose**: Verify ESSER amounts in data.ts against all available financial reports

---

## Executive Summary

After searching for and analyzing multiple interim reports, ESSER allocation documents, and financial reports, we have **confirmed and expanded** the discrepancies identified in the initial ESSER Source Analysis.

**Key Finding**: SFUSD's ESSER III allocation was **$94.0 million** (SFUSD only, not including SFCOE), which contradicts several figures currently in data.ts.

---

## Verified ESSER Allocations from Official Sources

### ESSER III - VERIFIED ✓
**Source**: ESSER III Expenditure Plan 2021-22 (parsed from PDF)

**Total ESSER III allocation**: $96,728,035 (combined SFUSD + SFCOE)
- **SFUSD**: **$94,011,833** (97.2%)
- **SFCOE**: $2,716,202 (2.8%)

**Breakdown by spending category**:
- Addressing Lost Instructional Time (20% minimum): $19.3M
- Other Uses (80%): $77.4M
  - Core Operations: $39.9M (largest single item)
  - Special Education: $16.7M
  - Expanded Summer Programs: $15.5M
  - Family Empowerment: $8.6M
  - Talent & Culture: $3.7M
  - Transportation: $2.4M

**Confidence Level**: ⭐⭐⭐⭐⭐ (Official CDE-approved expenditure plan)

---

### ESSER I and ESSER II - NOT VERIFIED ❌
**Attempted Sources**:
- California Department of Education ESSER II allocation spreadsheet (not accessible via web scraping)
- Interactive ESSER funding map (requires JavaScript to view data)
- SFUSD press releases (don't provide ESSER I/II breakdowns)

**What we know**:
- ESSER I and II allocations were based on each LEA's Title I, Part A funding share
- California's total ESSER II allocation: $6.7 billion (90% to LEAs)
- ESSER I total (California): $1.65 billion

**Recommendation**: Contact California Department of Education directly or download ESSER II allocation Excel file manually

---

## Cross-Reference with FY 2023-24 First Interim Report

**Source**: FY 2023-24 First Interim Report (December 2023)

### ESSER Balances as of First Interim (December 2023):

**Restricted Balance Detail (Page 25)**:
- Resource 3010 (ESSER Title I): $2,119,330
- Resource 3210 (Elementary and Secondary School Emergency Relief Fund): $0.01 (essentially $0)
- Resource 3215 (Governor's Emergency Education Relief Fund): $0.01 (essentially $0)
- Resource 4035 (ESSER Title II): $256,100
- Resource 4123 (ESSER Title IV - 21st Century): $5,179
- Resource 4124 (ESSER Title IV - 21st Century): $83,613

**Total ESSER ending balances: ~$2.46 million**

**Analysis**: By December 2023 (mid-FY 2023-24), virtually all ESSER funds had been spent or committed. This suggests:
1. ESSER funds were largely drawn down by FY 2023-24
2. The main ESSER resource code (3210) shows $0.01 remaining
3. Only Title I-related ESSER funds had any balance left ($2.1M)

**Key Insight**: The First Interim Report does NOT show separate line items for ESSER I, II, or III revenues received during FY 2023-24. This is consistent with ESSER funds being fully expended or consolidated into general federal revenue.

---

## Cross-Reference with FY 2023-24 Second Interim Letter

**Source**: CDE Second Interim Letter (May 3, 2024)

**ESSER Information**: None specifically mentioned

**Financial Context Provided**:
- Enrollment FY 2023-24: 48,734 students
- Unrestricted General Fund Revenues FY 2023-24: $726.1M
- Unrestricted General Fund Expenditures FY 2023-24: $785.4M
- Deficit Spending FY 2023-24: ($59.3M)

**Structural Deficit Issues**:
- CDE revised SFUSD's certification from "Qualified" to **"Negative"**
- $103.1M reductions planned at First Interim for 2024-25
- $28.3M of those reductions were NOT achieved and added back to unrestricted fund
- $88.8M additional unidentified reductions needed for 2025-26

**Critical Quote from CDE**:
> "In December 2023, the SFUSD adopted a Budget Balancing Solution Plan with the 2023–24 First Interim Report that included unrestricted general fund one-time reductions, **$103.1 million of ongoing reductions for 2024–25**, and an additional $88.8 million of unidentified ongoing reductions for 2025–26."

**Implication**: The $103M structural deficit figure mentioned in current data.ts for FY 2023-24 aligns with the CDE's statement about $103.1M of ongoing reductions needed for 2024-25.

---

## Comparison: Current data.ts vs Verified Sources

### FY 2023-24 ESSER Comparison

| Source | ESSER Amount | Confidence |
|--------|--------------|------------|
| **Current data.ts** | **$60M** | ⚠️ Unverified |
| **Budget Overview Exhibit 7** | **$26M** | ✓ Official budget |
| **First Interim Report** | **~$0M** (balance) | ✓ Official interim |
| **ESSER III Total Allocation** | **$94M** | ✓ CDE-approved plan |

**Analysis**:
1. **ESSER III total allocation**: $94M was allocated to SFUSD over multiple years (2021-2024)
2. **FY 2023-24 budget**: Only $26M ESSER III was budgeted for FY 2023-24 specifically
3. **FY 2023-24 actual**: By December 2023, virtually all ESSER was spent (First Interim shows ~$0)
4. **Current data.ts**: Shows $60M, which doesn't match any official source

**Hypothesis on $60M source**:
- June 2023 press release mentions "$60 million to replenish the Rainy Day Reserve"
- This was NOT stated to be ESSER funding
- Likely represents total one-time funds (ESSER + other sources) used for reserve replenishment
- Someone incorrectly entered this as "ESSER funding" in data.ts

---

## ESSER Timeline from Federal Expiration Dates

**ESSER I** (CARES Act, March 2020):
- Expired: September 30, 2022
- Expected spending: FY 2020-21, FY 2021-22

**ESSER II** (CRRSA Act, December 2020):
- Expired: September 30, 2023
- Expected spending: FY 2021-22, FY 2022-23

**ESSER III** (ARP Act, March 2021):
- Expired: September 30, 2024
- Expected spending: FY 2021-22, FY 2022-23, FY 2023-24

---

## Summary of Verified vs Unverified Data

### ✓ VERIFIED from Official Documents:

1. **ESSER III total allocation**: $94.0M (SFUSD only)
2. **FY 2023-24 ESSER III budget**: $26.0M (from Budget Overview Exhibit 7)
3. **FY 2023-24 ESSER ending balance**: ~$0 (from First Interim Report, December 2023)
4. **Total ESSER III (SFUSD + SFCOE combined)**: $96.7M (from press release and expenditure plan)

### ❌ NOT VERIFIED - Need Correction:

1. **FY 2023-24 ESSER**: data.ts shows $60M, should likely be **$26M**
2. **FY 2022-23 ESSER**: data.ts shows $100M, budget shows $138.9M available
3. **FY 2021-22 ESSER breakdown**: data.ts shows esserI: 20, esserII: 60, esserIII: 60, but budget breakdown doesn't match
4. **FY 2024-25 ESSER**: data.ts shows $10M, SACS forms show $0

### ⚠️ CANNOT VERIFY - Need Additional Research:

1. **ESSER I total allocation** (CARES Act) - need CDE allocation spreadsheet
2. **ESSER II total allocation** (CRRSA Act) - need CDE allocation spreadsheet
3. **FY 2020-21 ESSER I**: data.ts shows $24M - cannot verify from available documents

---

## Recommended Corrections to data.ts

### HIGH CONFIDENCE - Recommend Immediate Change:

```javascript
// FY 2023-24 - Change ESSER from $60M to $26M
{
  year: "2023-24",
  esser: 26,  // CHANGED from 60 - Source: Budget Overview Exhibit 7, Pages 33-34
  oneTimeFunds: 26,  // CHANGED from 60
  // Note: This affects structural deficit calculation
}
```

**Supporting Evidence**:
- Budget Exhibit 7 line-item breakdown totals $26.0M
- First Interim Report shows ESSER nearly fully expended by December 2023
- $60M figure from press release referred to reserve replenishment, not ESSER specifically

### MEDIUM CONFIDENCE - Investigate Before Changing:

```javascript
// FY 2024-25 - Possibly change ESSER from $10M to $0
{
  year: "2024-25",
  esser: 0,  // CHANGED from 10 - Source: SACS forms show $0 ESSER
}
```

**Caveat**: $10M might represent obligated but unspent ESSER from prior years

### LOW CONFIDENCE - Need More Research:

```javascript
// FY 2022-23 - Unclear if $100M or $138.9M is correct
// Need to determine if budget shows total allocation vs annual expenditure

// FY 2021-22 - Need to fix ESSER I/II/III breakdown
// Total is close ($140M vs $138.9M) but categorical split is wrong
```

---

## Impact on Structural Deficit Calculation (FY 2023-24)

### Using CORRECTED $26M ESSER (instead of $60M):

**Calculation**:
```
Total Revenues:     $696.4M  (from Budget Overview)
ESSER (one-time):   -$26.0M  (CORRECTED from $60M)
Ongoing Revenues:   $670.4M

Total Expenditures: $687.4M  (from Budget Overview)

Structural Deficit: $670.4M - $687.4M = -$17M
```

**Comparison with Current Data**:
- **Calculated structural deficit**: -$17M
- **Current data.ts shows**: -$103M
- **Discrepancy**: $86M

**Possible Explanations for $103M**:
1. **CDE Second Interim Letter** mentions "$103.1 million of ongoing reductions for 2024–25" - this may be the source
2. The $103M might represent cumulative structural deficit recognition, not FY 2023-24 alone
3. The $103M might include non-operating costs (OPEB, pension shortfalls, etc.)
4. Need to find Board resolution or press release that explicitly states "$103M structural deficit for FY 2023-24"

---

## External Sources Consulted

### Documents Downloaded and Analyzed:
1. ✓ FY 2020-21 Budget Overview (Revised)
2. ✓ FY 2021-22 Budget Overview
3. ✓ FY 2022-23 Budget Overview
4. ✓ FY 2023-24 Budget Overview
5. ✓ FY 2024-25 SACS Forms
6. ✓ FY 2025-26 SACS Forms
7. ✓ FY 2023-24 First Interim Report (December 2023)
8. ✓ FY 2023-24 Second Interim Letter (May 2024, CDE)
9. ✓ ESSER III Expenditure Plan 2021-22

### Web Sources Searched:
- [California Department of Education - ESSER I Funding](https://www.cde.ca.gov/fg/cr/esser.asp)
- [California Department of Education - ESSER II Funding](https://www.cde.ca.gov/fg/cr/esseriifaqs.asp)
- [SFUSD Press Release - Federal Stimulus (Oct 2021)](https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2021-10-28-sf-board-education-details-plans-utilize-one-time-federal-stimulus-funding)
- [SFUSD Budget Archives](https://www.sfusd.edu/about-sfusd/budget-and-lcap/budget-and-lcaps-previous-fiscal-years)

### Still Needed:
- [ ] California Department of Education ESSER II allocation Excel file (manual download)
- [ ] California Department of Education ESSER I allocation records
- [ ] SFUSD CAFR (Comprehensive Annual Financial Report) for FY 2022-23, 2023-24
- [ ] SFUSD Board resolutions specifying $103M structural deficit for FY 2023-24

---

## Recommendations

### Immediate Actions:

1. **FY 2023-24 ESSER**: Change from $60M to **$26M**
   - Source: Budget Overview Exhibit 7
   - Confidence: ⭐⭐⭐⭐⭐ Very High

2. **Update esserFunding array** with verified ESSER III total:
   ```javascript
   // Note: ESSER III total allocation was $94.0M (SFUSD only), spent across FY 2021-22 through 2023-24
   ```

3. **Investigate FY 2023-24 structural deficit**: Reconcile $103M (current) vs $17M (calculated with correct ESSER)
   - Search for Board resolution or official announcement stating $103M
   - Determine if $103M includes non-operating costs
   - Clarify accounting methodology

### Research Needed:

1. **ESSER I and II allocations**: Contact CDE or download Excel files manually
2. **FY 2022-23 ESSER**: Determine if $100M represents annual spend vs $138.9M total allocation
3. **FY 2021-22 ESSER breakdown**: Verify categorical split (I/II/III)
4. **CAFR reports**: Obtain audited financials for definitive ESSER revenue figures

### Data Quality Note:

The ESSER data in `data.ts` appears to have been compiled from:
- ✓ Press releases (high-level rounded totals)
- ✗ NOT from detailed budget line-items
- ? Possibly from interim reports or other unidentified sources

**Recommendation**: Systematically update all ESSER figures to match official budget documents, citing specific pages/exhibits as sources.

---

*End of ESSER Verification Report*
