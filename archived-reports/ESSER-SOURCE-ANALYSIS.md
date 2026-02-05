# ESSER Funding Source Analysis
**Date**: February 4, 2026
**Purpose**: Trace the source of ESSER figures in data.ts vs official budget documents

---

## Summary

**CRITICAL FINDING**: The ESSER amounts in `data.ts` do NOT match the official budget documents for several years, particularly **FY 2023-24** which shows $60M in current data but only **$26M in the official budget**.

---

## Comprehensive ESSER Table: data.ts vs Official Budget Documents

| Fiscal Year | **Current data.ts** | **Official Budget Document** | Match? | Source Document | Notes |
|-------------|---------------------|------------------------------|--------|-----------------|-------|
| **2020-21** | esser: 0<br>esserI: 24<br>esserII: 0<br>esserIII: 0<br>**Total: $24M** | Not found in budget doc | ⚠️ | FY 2020-21 Budget Overview (Revised) | Budget adopted July 2020, early pandemic - ESSER may have been allocated after budget finalized |
| **2021-22** | esser: 140<br>esserI: 20<br>esserII: 60<br>esserIII: 60<br>**Total: $140M** | **Total: $138.9M**<br>- ESSER II: $43M<br>- ESSER III: $95.9M | ⚠️ Close | FY 2021-22 Budget Overview, Page 20-21 | Press release says "$140M federal stimulus", budget shows $138.9M |
| **2022-23** | esser: 100<br>esserI: 0<br>esserII: 40<br>esserIII: 60<br>**Total: $100M** | **Total: $138.9M**<br>- ESSER II: $43M<br>- ESSER III: $95.9M | ❌ | FY 2022-23 Budget Overview, Page 19-20 | **$38.9M discrepancy** - current shows $100M, budget shows $138.9M |
| **2023-24** | esser: 60<br>esserI: 0<br>esserII: 0<br>esserIII: 60<br>**Total: $60M** | **Total: $26.0M**<br>- ESSER III only: $26M | ❌ | FY 2023-24 Budget Overview, Exhibit 7, Pages 33-34 | **$34M discrepancy!** - current shows $60M, budget shows only $26M |
| **2024-25** | esser: 10<br>esserI: 0<br>esserII: 0<br>esserIII: 10<br>**Total: $10M** | ESSER: $0 | ⚠️ | FY 2024-25 SACS Forms, Page 14-15 | Current shows $10M, SACS shows $0 - ESSER funds fully expended |
| **2025-26** | esser: 0<br>esserI: 0<br>esserII: 0<br>esserIII: 0<br>**Total: $0** | ESSER: $0 | ✓ | FY 2025-26 SACS Forms | All ESSER funds expired |

---

## Detailed Analysis by Fiscal Year

### FY 2020-21: $24M (ESSER I)

**Current Data**:
```javascript
esser: 0  // in budgetData
esserI: 24, esserII: 0, esserIII: 0, total: 24  // in esserFunding array
```

**Budget Document**: No ESSER explicitly mentioned

**Source Hypothesis**:
- ESSER I (CARES Act) was passed March 2020
- SFUSD budget adopted July 2020
- ESSER I allocation may have come after budget was finalized
- $24M likely came from a later interim report or federal allocation announcement

**Status**: ⚠️ **Cannot verify from available documents** - need ESSER allocation records

---

### FY 2021-22: $140M (Current) vs $138.9M (Budget)

**Current Data**:
```javascript
esser: 140
esserI: 20, esserII: 60, esserIII: 60, total: 140
```

**Budget Document** (FY 2021-22 Budget Overview, Page 20-21):
- ESSER II: $43.0M
- ESSER III: $95.9M
- **Total: $138.9M**

**Press Release** (June 2021):
> "SFUSD expects to receive **$140 million in federal stimulus funding**"

**Analysis**:
- Press release: $140M (rounded/estimated)
- Budget document: $138.9M (detailed breakdown)
- Difference: $1.1M (0.8%)

**Breakdown Discrepancy**:
- Current shows: esserI: 20, esserII: 60, esserIII: 60
- Budget shows: esserII: 43, esserIII: 95.9

This is a **categorical allocation error** - the breakdown doesn't match even though the total is close.

**Status**: ⚠️ **VERIFY** - Total is close but breakdown is incorrect

---

### FY 2022-23: $100M (Current) vs $138.9M (Budget)

**Current Data**:
```javascript
esser: 100
esserI: 0, esserII: 40, esserIII: 60, total: 100
```

**Budget Document** (FY 2022-23 Budget Overview, Page 19-20):
- ESSER II: $43.0M
- ESSER III: $95.9M
- **Total: $138.9M**

**Analysis**:
- Current: $100M
- Budget: $138.9M
- **Difference: $38.9M (38.9% understatement!)**

This is a **major discrepancy**. Possible explanations:
1. $100M represents budgeted/planned ESSER expenditure for FY 2022-23 only
2. $138.9M represents total remaining ESSER balance (multi-year)
3. Current data uses "net new ESSER" vs "total ESSER available"

**Hypothesis**: The $100M may represent the amount budgeted to be SPENT in FY 2022-23, while $138.9M is the total ESSER balance available across multiple years.

**Status**: ❌ **ERROR** - Significant discrepancy needs resolution

---

### FY 2023-24: $60M (Current) vs $26M (Budget) **[CRITICAL DISCREPANCY]**

**Current Data**:
```javascript
esser: 60
esserI: 0, esserII: 0, esserIII: 60, total: 60
```

**Budget Document** (FY 2023-24 Budget Overview, Exhibit 7, Pages 33-34):

| ESSER III Program | Amount |
|-------------------|--------|
| ESSER III General (32130) | $281,975 |
| ESSER III Learn & Recover (32140) | $16,880,393 |
| ESSER III Learn Rec Pitch (32141) | $47,458 |
| ELOG ESSER III State Reserve (32180) | $3,290,749 |
| ELOG ESSER III State Reserve Learning Loss (32190) | $5,475,110 |
| **TOTAL ESSER III** | **$25,975,685** |

**Rounded: $26.0M**

**Press Release** (June 2023):
> "$60 million to replenish the Rainy Day Reserve and maintain a Systems Reserve"

**Analysis**:
- Current: $60M ESSER III
- Budget: $26M ESSER III
- **Difference: $34M (131% overstatement!)**

**Hypothesis on $60M Source**:
1. **Press Release Confusion**: The $60M mentioned in the press release is for "reserve replenishment", NOT necessarily ESSER
2. **Different Accounting**: $60M may represent total one-time funds (ESSER + state grants + other federal programs)
3. **Multi-Year Balance**: $60M could be cumulative ESSER balance across multiple years, not just FY 2023-24
4. **Learning Recovery Block Grant**: The $60M might include other federal pandemic relief programs beyond ESSER

**Most Likely**: Someone interpreted the "$60M to replenish reserves" press release line as "ESSER funding" and entered it as such in data.ts, but the actual ESSER III allocation shown in the detailed budget is only $26M.

**Status**: ❌ **ERROR** - Critical discrepancy, $60M should likely be $26M

---

### FY 2024-25: $10M (Current) vs $0 (SACS)

**Current Data**:
```javascript
esser: 10
esserI: 0, esserII: 0, esserIII: 10, total: 10
```

**Budget Document** (FY 2024-25 SACS Forms, Restricted General Fund, Page 14-15):
- ESSER I: $0
- ESSER II: $0
- ESSER III: $0
- **Total: $0**

**Analysis**:
- Current: $10M
- Budget: $0
- **Difference: $10M**

**Note**: ESSER III funds had a September 2024 expiration deadline. By the time of the June 2024 adopted budget, all ESSER funds may have been obligated/spent.

**Hypothesis**:
1. The $10M may represent ESSER funds obligated but not yet expended as of budget adoption
2. Or it's a carryover from prior year that was spent early in FY 2024-25
3. Or it's an error - ESSER was already fully expended by this point

**Status**: ⚠️ **VERIFY** - Small amount but shows $10M when budget shows $0

---

### FY 2025-26: $0 (Both Match)

**Current Data**:
```javascript
esser: 0
esserI: 0, esserII: 0, esserIII: 0, total: 0
```

**Budget Document**: $0

**Analysis**: ✓ Match - All ESSER funds expired

---

## ESSER Timeline from Federal Allocations

### Background on ESSER Deadlines:
- **ESSER I** (CARES Act, March 2020): Expired September 30, 2022
- **ESSER II** (CRRSA Act, December 2020): Expired September 30, 2023
- **ESSER III** (ARP Act, March 2021): Expired September 30, 2024

### Expected Drawdown Pattern:
Based on federal expiration dates, districts would typically:
- FY 2020-21: Spend ESSER I
- FY 2021-22: Spend ESSER I + ESSER II + start ESSER III
- FY 2022-23: Spend remaining ESSER II + ESSER III
- FY 2023-24: Spend final ESSER III (expire Sept 2024)
- FY 2024-25: Possibly some ESSER III carryover
- FY 2025-26: All ESSER expired

---

## Comparison: Current Data vs Budget Documents

### Summary Table

| Year | Current Total | Budget Total | Difference | Error % | Status |
|------|--------------|--------------|------------|---------|--------|
| 2020-21 | $24M | Not found | N/A | N/A | Cannot verify |
| 2021-22 | $140M | $138.9M | +$1.1M | +0.8% | ⚠️ Close |
| 2022-23 | $100M | $138.9M | -$38.9M | -38.9% | ❌ Major |
| **2023-24** | **$60M** | **$26M** | **-$34M** | **-131%** | ❌ **Critical** |
| 2024-25 | $10M | $0M | +$10M | N/A | ⚠️ Verify |
| 2025-26 | $0M | $0M | $0 | 0% | ✓ Match |

**Total ESSER (per current data)**: $334M
**Total ESSER (per budget docs where verifiable)**: ~$304M
**Difference**: ~$30M overstatement

---

## Root Cause Analysis

### Why the Discrepancies?

1. **Press Releases vs Budget Documents**:
   - Press releases give rounded, high-level figures
   - Budget documents have detailed line-item breakdowns
   - Current data appears to use press release figures

2. **Multi-Year Allocations vs Annual Spending**:
   - ESSER grants were multi-year allocations
   - Some figures may represent "total allocation" vs "annual expenditure"
   - Budget docs may show "available this year" vs "total received"

3. **Different Accounting Periods**:
   - Federal fiscal year vs school district fiscal year
   - Budget adoption (June) vs actual expenditure timing
   - Carryover vs new funds

4. **Aggregation Confusion**:
   - $60M "to replenish reserves" interpreted as "ESSER funding"
   - May include multiple federal programs, not just ESSER
   - Learning Recovery Block Grant, other pandemic relief mixed in

---

## Recommendations

### Immediate Actions:

1. **FY 2023-24: Change from $60M to $26M**
   - High confidence this is an error
   - Budget Exhibit 7 clearly shows $26M ESSER III
   - $60M was likely misinterpreted from press release

2. **FY 2022-23: Investigate $100M vs $138.9M**
   - Determine if $100M is annual expenditure vs total allocation
   - Check interim reports for actual ESSER spending

3. **FY 2021-22: Verify ESSER I/II/III breakdown**
   - Total is close ($140M vs $138.9M)
   - But breakdown (20/60/60) doesn't match budget (0/43/95.9)

4. **FY 2024-25: Verify $10M vs $0**
   - Small amount but worth confirming
   - Check if there was any ESSER carryover

### Research Needed:

- [ ] Find ESSER allocation letters from federal/state government
- [ ] Review interim financial reports (1st/2nd/3rd Interim) for actual ESSER expenditures
- [ ] Check CAFR (Comprehensive Annual Financial Report) for audited ESSER amounts
- [ ] Determine if "federal stimulus" includes programs beyond ESSER

### Data Quality:

The ESSER data in `data.ts` appears to have been curated from:
- ✓ Press releases (high-level totals)
- ✗ NOT from detailed budget documents (line-item allocations)
- ? Possibly from interim reports or other sources we haven't reviewed

**Recommendation**: Update `data.ts` to match official budget documents, adding source citations.

---

## Proposed Corrections

### esserFunding Array - PROPOSED CHANGES:

```javascript
export const esserFunding = [
  // FY 2020-21 - Cannot verify, keep as-is pending research
  { year: "2020-21", esserI: 24, esserII: 0, esserIII: 0, total: 24 },

  // FY 2021-22 - Close match, update breakdown
  { year: "2021-22", esserI: 0, esserII: 43, esserIII: 96, total: 139 },  // CHANGED from 20/60/60

  // FY 2022-23 - Major discrepancy, needs research
  { year: "2022-23", esserI: 0, esserII: 43, esserIII: 96, total: 139 },  // CHANGED from 0/40/60

  // FY 2023-24 - CRITICAL: Change from $60M to $26M
  { year: "2023-24", esserI: 0, esserII: 0, esserIII: 26, total: 26 },  // CHANGED from 60

  // FY 2024-25 - Verify, may need to change to $0
  { year: "2024-25", esserI: 0, esserII: 0, esserIII: 10, total: 10 },  // VERIFY or change to 0

  // FY 2025-26 - Correct
  { year: "2025-26", esserI: 0, esserII: 0, esserIII: 0, total: 0 },
];
```

### budgetData Array - PROPOSED CHANGES:

```javascript
// FY 2023-24 - Update ESSER
{
  year: "2023-24",
  esser: 26,  // CHANGED from 60
  oneTimeFunds: 26,  // CHANGED from 60
  // This affects structural deficit calculation!
}
```

---

## Impact on Structural Deficit Calculation (FY 2023-24)

### BEFORE (using $60M ESSER):
```
Revenues: $696.4M
Remove ESSER: -$60M
Ongoing revenues: $636.4M
Expenditures: $687.4M
Structural deficit: -$51M
```

### AFTER (using $26M ESSER):
```
Revenues: $696.4M
Remove ESSER: -$26M
Ongoing revenues: $670.4M
Expenditures: $687.4M
Structural deficit: -$17M
```

**This makes the $103M structural deficit in current data even MORE questionable!**

- Budget calculation: **-$17M**
- Current data shows: **-$103M**
- **Gap: $86M unexplained**

---

## Conclusion

The ESSER figures in `data.ts` have **significant discrepancies** compared to official budget documents:

✅ **FY 2025-26**: Correct ($0)
⚠️ **FY 2024-25**: Questionable ($10M vs $0)
❌ **FY 2023-24**: **ERROR** ($60M should be $26M)
❌ **FY 2022-23**: **ERROR** ($100M vs $138.9M - unclear which is correct)
⚠️ **FY 2021-22**: Close total but incorrect breakdown
⚠️ **FY 2020-21**: Cannot verify

**Primary Issue**: Data appears sourced from press releases rather than detailed budget documents.

**Recommendation**: **Conduct a full ESSER audit** using:
1. Official budget documents (✓ we have these)
2. Interim financial reports (need to obtain)
3. CAFR audited financials (need to obtain)
4. Federal/state ESSER allocation letters (need to obtain)

---

*End of ESSER Source Analysis*
