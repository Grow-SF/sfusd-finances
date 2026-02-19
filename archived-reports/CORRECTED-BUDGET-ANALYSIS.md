# CORRECTED Budget Analysis - Understanding SFUSD's Fiscal Structure
**Date**: February 4, 2026
**Purpose**: Correct fundamental errors in previous analysis about revenue/expenditure classification

---

## CRITICAL CORRECTION: ESSER is in RESTRICTED Fund, Not Unrestricted

### The Fundamental Error

**PREVIOUS INCORRECT ASSUMPTION:**
> "To calculate structural deficit, subtract ESSER from total revenues"
> "Ongoing revenues = $696.4M - $60M ESSER = $636.4M"

**WHY THIS WAS WRONG:**
- ESSER is classified as **RESTRICTED federal revenue**
- The $696.4M "Unrestricted General Fund Revenue" figure **ALREADY EXCLUDES ESSER**
- Subtracting ESSER from unrestricted revenues makes no sense mathematically

---

## Correct Budget Structure - All Fiscal Years

### FY 2020-21 (COVID Year)

**Total Budget**: $933.1M

**Unrestricted General Fund:**
- Revenues: $640.9M
- Expenditures: $636.4M
- Balance: +$4.5M (before other financing)

**Restricted General Fund**: $357.0M
- Federal: $23.0M
- State: $99.8M
- Local: $234.2M

**ESSER**: **$0** (CARES Act not yet received in adopted budget)
- Budget adopted July 2020
- CARES Act funding arrived later in fiscal year

**Budget Status**:
- Technically shows surplus due to $45.3M state "COVID-19 Learning Loss" one-time funding
- Document mentions $57M budget shortfall addressed with budget cuts and one-time funds

---

### FY 2021-22 (ESSER Peak Year)

**Total Budget**: $1.17B

**Unrestricted General Fund:**
- Revenues: $610.3M
- Expenditures: $589.8M
- Revenues less Expenditures: +$20.5M

**Restricted General Fund**: $482.0M

**ESSER (in Restricted fund)**: **$138.9M**
- ESSER II: $43.0M
- ESSER III: $95.9M
- **$119M used to address the $100.2M budget deficit**

**Budget Status**:
- **Budget deficit**: $100.2M (stated explicitly in budget document, page 4)
- Addressed with $119M ESSER federal stimulus
- Warning: "Looming $312 million deficit in FY 2022-23"

**Key Insight**: The $100.2M deficit is the gap between ongoing revenues and expenditures that was filled with one-time ESSER funds.

---

### FY 2022-23 (ESSER Spend-Down)

**Total Budget**: $1.15B

**Unrestricted General Fund:**
- Revenues: $655.9M
- Expenditures: $677.9M
- Deficit: -$22M (before other financing)

**Restricted General Fund**: $373.9M

**ESSER (in Restricted fund)**: **$138.9M total allocation**
- Same allocation as FY 2021-22
- Being spent down
- Page 19: "$119 million expenditures shifted to ESSER II and ESSER III one-time federal funding sources in 2021-22 have been shifted to the Unrestricted General Fund, other allowable funding sources, or reduced/eliminated"

**Budget Status**:
- Initially projected **$125M deficit**
- Implemented **$90M expenditure reductions** + **$35M funding sources**
- Budget document states: **"The structural imbalance in the budget continues"**
- Relying on one-time revenues ($19.9M state block grant + ESSER)

**Ending Fund Balance**: $128.8M (includes $65M budget stabilization reserve to be drawn down)

---

### FY 2023-24 (ESSER Final Year)

**Total Budget**: $1.28B

**Unrestricted General Fund:**
- Revenues: $706.4M
- Expenditures: $696.4M (from Exhibit 5)
- Apparent surplus: +$10M

**Restricted General Fund**: $473.6M

**ESSER (in Restricted fund)**: **$26.0M** (from Exhibit 7 breakdown)
- Only ESSER III remaining
- ESSER I expired Sept 2022
- ESSER II expired Sept 2023
- ESSER III expires Sept 2024

**ESSER III Programs (Exhibit 7):**
- Resource 32130: ESSER III General: $0.28M
- Resource 32140: ESSER III Learn & Recovery: $16.88M
- Resource 32141: ESSER III Learn Rec Pitch: $0.05M
- Resource 32180: ELOG ESSER III State Reserve: $3.29M
- Resource 32190: ELOG ESSER III State Reserve LL: $5.48M
- **Total: $25.98M ≈ $26M**

**Budget Status**:
- Budget document shows as BALANCED
- Ending fund balance increases from $174.7M to $184.7M (+$10M)
- **No explicit mention of "structural deficit" in this budget document**
- However, uses $165.9M in "Other Financing Uses" (transfers, one-time sources)

**From FY 2023-24 First Interim Report (December 2023):**
- ESSER balances nearly depleted: Resource 3210 shows $0.01 remaining
- Only $2.5M total ESSER-related balances left across all programs

---

## How "Structural Deficit" Should Be Calculated

### The Correct Methodology:

**Structural Deficit = Ongoing Revenues - Ongoing Expenditures**

**Components:**

1. **Ongoing Revenues**:
   - Unrestricted revenues: LCFF, ongoing state, local taxes
   - Does NOT include: one-time grants, ESSER, reserve drawdowns

2. **Ongoing Expenditures**:
   - Regular operations, salaries, benefits
   - Does NOT include: one-time projects, capital

3. **One-Time Funds** (mask the structural deficit):
   - ESSER (federal COVID relief)
   - State block grants (one-time)
   - Reserve drawdowns
   - Budget stabilization funds

### Example - FY 2021-22:

**Stated in budget document (page 4):**
> "A total of $119 million federal stimulus funding is being used to address a budget deficit of $100.2 million"

**This means:**
- Ongoing revenues: ~$489M (rough estimate: $610M unrestricted - $121M one-time sources)
- Ongoing expenditures: ~$589M
- **Structural deficit: -$100M**
- Filled with: $119M ESSER

**Note**: The exact calculation requires detailed line-item analysis to separate ongoing from one-time revenues within the unrestricted fund.

---

## Where the $103M Structural Deficit (FY 2023-24) Comes From

### Current data.ts shows:
```javascript
{
  year: "2023-24",
  structuralDeficit: 103, // HOLD - needs verification
}
```

### Sources Checked:

1. **FY 2023-24 Budget Overview**:
   - ❌ Does NOT mention $103M structural deficit
   - Shows budget as balanced with $10M fund balance increase

2. **FY 2023-24 First Interim Report** (December 2023):
   - ❌ Does NOT explicitly state $103M structural deficit
   - Shows continued fiscal challenges

3. **FY 2023-24 Second Interim Letter** (May 2024, from CDE):
   - ✓ **FOUND IT**: "In December 2023, the SFUSD adopted a Budget Balancing Solution Plan with the 2023–24 First Interim Report that included unrestricted general fund one-time reductions, **$103.1 million of ongoing reductions for 2024–25**, and an additional $88.8 million of unidentified ongoing reductions for 2025–26."

### Key Insight:

The **$103M is NOT the FY 2023-24 structural deficit**. It is the **ongoing reductions needed FOR FY 2024-25** as identified at First Interim.

**The $103M represents:**
- Spending reductions needed to balance FY 2024-25 budget
- Recognized in December 2023 (First Interim)
- Later adjusted: only $74.8M of the $103M was actually implemented

### Correct Interpretation:

If SFUSD needed $103M in ongoing reductions for FY 2024-25, this implies:
- FY 2024-25 structural deficit (before cuts): ~$103M
- After planned cuts: Would be smaller (but CDE revised certification to "Negative")

**For FY 2023-24 specifically:**
- Budget shows as balanced with one-time funds
- True structural deficit unclear from budget document alone
- Likely masked by remaining ESSER ($26M) and other one-time sources

---

## Corrected ESSER Verification

### FY 2023-24: $60M vs $26M vs $21M?

**Current data.ts**: $60M
**Budget Exhibit 7**: $26M (line-item breakdown)
**First Interim**: ~$0M (balance remaining)

**Analysis:**
- **$26M is correct for FY 2023-24 budgeted ESSER III**
- By December 2023 First Interim, nearly all spent ($0.01 remaining in main account)
- The $60M in data.ts appears to be from misinterpreting press release about "$60 million to replenish reserves"

**Recommendation**: **Change data.ts from $60M to $26M**

---

### ESSER Timeline - Corrected

| Fiscal Year | ESSER in Budget | Source | Notes |
|-------------|-----------------|--------|-------|
| **2020-21** | $0 | Budget Overview | CARES Act not yet received; arrived later in year |
| **2021-22** | $138.9M | Budget Overview p.20-21 | ESSER II: $43M, ESSER III: $95.9M |
| **2022-23** | $138.9M allocation | Budget Overview p.20 | Same allocation, being spent down |
| **2023-24** | **$26.0M** | Budget Exhibit 7 | Only ESSER III remaining; nearly gone by Dec 2023 |
| **2024-25** | $0 | SACS Forms | All ESSER expired |
| **2025-26** | $0 | SACS Forms | All ESSER expired |

---

## Implications for Current data.ts

### What Needs to Change:

1. **FY 2023-24 ESSER**:
   - Change from $60M → **$26M**
   - Source: Budget Overview Exhibit 7

2. **FY 2023-24 Structural Deficit ($103M)**:
   - Mark as **"ongoing reductions needed for FY 2024-25"** not "FY 2023-24 deficit"
   - OR find the actual FY 2023-24 structural deficit figure
   - Current label is misleading

3. **All years: Do NOT subtract ESSER from unrestricted revenues**
   - ESSER is already excluded from unrestricted fund
   - ESSER is in restricted fund only

### What Was Correct:

1. **Principle**: "Treat ESSER as one-time funds" ✓ Correct
2. **Concept**: "Structural deficit vs deficit after one-time funds" ✓ Correct framework
3. **FY 2024-25 and 2025-26**: Data appears accurate
4. **FY 2020-21 PEEF and parcel tax**: Fix already implemented ✓

---

## Revised Recommendations

### HIGH PRIORITY:

1. **FY 2023-24 ESSER**: Change $60M → **$26M** (high confidence)

2. **FY 2023-24 Structural Deficit**:
   - Current: $103M
   - Needs investigation: This number is for FY 2024-25 reductions, not FY 2023-24 deficit
   - Action: Find actual FY 2023-24 structural deficit or relabel field

### MEDIUM PRIORITY:

3. **FY 2022-23**: Verify if $100M ESSER in data.ts represents:
   - Annual drawdown for FY 2022-23? OR
   - Total allocation ($138.9M)?
   - Budget shows $138.9M total allocation being spent across multiple years

4. **FY 2021-22**: Verify ESSER I/II/III breakdown:
   - Current: I: $20M, II: $60M, III: $60M (total: $140M)
   - Budget: II: $43M, III: $95.9M (total: $138.9M)
   - Mismatch in breakdown even though totals close

### LOW PRIORITY:

5. **FY 2020-21**: ESSER should probably be $0 in adopted budget (CARES Act hadn't arrived yet)
   - Current data.ts shows: esserI: $24M
   - This might represent mid-year allocation that arrived after budget adoption

---

## Key Lessons Learned

### 1. **Fund Structure is Critical**

California school districts use fund accounting:
- **Unrestricted General Fund**: Flexible dollars (LCFF, local revenue)
- **Restricted General Fund**: Categorical programs (federal grants, state programs, local parcel taxes)
- ESSER is ALWAYS restricted, NEVER unrestricted

### 2. **Budget Balance ≠ Structural Balance**

- **Adopted budget** can be "balanced" using one-time funds
- **Structural deficit** is the ongoing revenue/expenditure gap
- Districts mask structural deficits with:
  - One-time grants (ESSER)
  - Reserve drawdowns
  - Budget stabilization funds
  - State block grants

### 3. **Deficit Definitions Vary**

- **Projected deficit**: Gap before cuts and one-time funds
- **Adopted deficit**: After applying solutions (usually $0)
- **Structural deficit**: Ongoing revenues minus ongoing expenditures
- **Deficit after one-time funds**: What remains after applying temporary fixes

### 4. **Document Sources Matter**

- **Budget Overview**: Official adopted budget, shows "balanced" with solutions applied
- **Interim Reports**: Mid-year actuals, show developing problems
- **CDE Letters**: State oversight assessment, identifies concerns
- **Press Releases**: High-level public messaging, often rounded figures

---

## Next Steps

### For Immediate Correction:

1. Update FY 2023-24 ESSER: $60M → $26M
2. Add annotation to all structural deficit figures explaining methodology
3. Add comments in code explaining fund structure

### For Further Research:

1. Find actual FY 2023-24 structural deficit figure (if different from $103M)
2. Obtain FY 2022-23 and 2021-22 interim reports to verify ESSER drawdown patterns
3. Contact SFUSD Budget Office to confirm structural deficit calculation methodology

### For Data Quality:

1. Add source citations for every ESSER figure
2. Document whether figures are "budgeted", "allocated", or "expended"
3. Add field distinguishing "ongoing" vs "one-time" revenue for all years

---

*End of Corrected Analysis*
