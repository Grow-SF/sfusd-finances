# Data Structure Changes - Deficit Field Restructure
**Date**: February 4, 2026
**Status**: ✅ IMPLEMENTED (except FY 2023-24 - on hold)

---

## Summary

Restructured deficit tracking to distinguish between **structural deficit** (ongoing gap) and **deficit after one-time funds** (adopted/final). This is critical because one-time grants like ESSER cannot be used for ongoing expenses like salaries.

## Key Principle

**One-time funds ≠ ongoing revenue**

Grants like ESSER, state relief funds, and reserve drawdowns are temporary and mask the true structural deficit. The new structure makes this visible.

---

## New Data Structure

### Field Definitions

**In `budgetData` array:**
```typescript
{
  year: string,
  totalBudget: number,
  lcff: number,
  peef: number,
  parcelTax: number,
  enrollment: number,

  // NEW DEFICIT FIELDS
  structuralDeficit: number,        // Ongoing revenues - ongoing expenses (excludes ALL one-time)
  deficitAfterOneTime: number,      // Deficit after applying one-time funds (adopted/final)

  // NEW ONE-TIME TRACKING
  oneTimeFunds: number,             // Total one-time funds (ESSER + state + reserves)
  oneTimeReserves: number | null,   // Reserve drawdowns specifically (subset)

  esser: number,                    // ESSER (part of oneTimeFunds)
  cuts?: number,                    // Permanent budget cuts
}
```

**OLD field removed:**
- `deficit` → replaced with `structuralDeficit` + `deficitAfterOneTime`

---

## Changes by Fiscal Year

### FY 2025-26

**OLD:**
```javascript
{ year: '2025-26', deficit: 0, esser: 0, cuts: 113.8 }
```

**NEW:**
```javascript
{
  year: '2025-26',
  structuralDeficit: 99,        // $99M ongoing gap
  deficitAfterOneTime: 0,       // Balanced after reserves + cuts
  oneTimeFunds: 225,            // $225M reserve drawdowns
  oneTimeReserves: 225,
  esser: 0,
  cuts: 113.8,
}
```

**Calculation:**
- SACS Form 01 shows $98.68M operating deficit before financing
- Uses $224.6M in reserves to balance
- $113.8M in permanent cuts
- **Result**: Balanced "on paper" but $99M structural gap remains

---

### FY 2024-25

**OLD:**
```javascript
{ year: '2024-25', deficit: 51.9, esser: 10 }
```

**NEW:**
```javascript
{
  year: '2024-25',
  structuralDeficit: 159,       // $159M ongoing gap
  deficitAfterOneTime: 52,      // After mitigation
  oneTimeFunds: 107,            // $10M ESSER + $97M reserves
  oneTimeReserves: 97,
  esser: 10,
}
```

**Calculation:**
- SACS Form 01 shows $148.52M operating deficit
- Plus $10M ESSER (one-time) = $159M structural deficit
- After mitigation measures: $52M adopted deficit

---

### FY 2023-24 ⚠️ **ON HOLD**

**CURRENT (unchanged):**
```javascript
{
  year: '2023-24',
  structuralDeficit: 103,       // HOLD - needs verification
  deficitAfterOneTime: 103,     // HOLD - needs verification
  oneTimeFunds: 60,
  oneTimeReserves: 0,
  esser: 60,
}
```

**ISSUE:**
- Budget document shows +$10M operating surplus (with $60M ESSER)
- Calculation: $10M - $60M ESSER = **$50M structural deficit**
- But current data shows **$103M**
- Discrepancy needs resolution with research team

**Possible explanations:**
1. $103M is multi-year cumulative deficit
2. $103M includes future obligations not in budget doc
3. Budget surplus calculation includes other one-time funds not tracked

**Action Required**: Research team to verify source of $103M figure

---

### FY 2022-23

**OLD:**
```javascript
{ year: '2022-23', deficit: 125, esser: 100 }
```

**NEW:**
```javascript
{
  year: '2022-23',
  structuralDeficit: 225,       // $225M ongoing gap
  deficitAfterOneTime: 0,       // Balanced after mitigation
  oneTimeFunds: 176,            // $100M ESSER + $76M state
  oneTimeReserves: 0,
  esser: 100,
}
```

**Calculation:**
- Projected $125M deficit (before ESSER)
- Plus $100M ESSER = $225M structural deficit
- Addressed through:
  - $49M permanent cuts
  - $176M one-time funds ($100M ESSER + $76M state block grants)
- **Result**: Balanced after mitigation

---

### FY 2021-22

**OLD:**
```javascript
{ year: '2021-22', deficit: 100.2, esser: 140 }
```

**NEW:**
```javascript
{
  year: '2021-22',
  structuralDeficit: 240,       // $240M ongoing gap
  deficitAfterOneTime: 100,     // Adopted deficit
  oneTimeFunds: 140,            // ESSER only
  oneTimeReserves: 0,
  esser: 140,
}
```

**Calculation:**
- Adopted deficit: $100.2M (with ESSER)
- Plus $140M ESSER = $240M structural deficit
- Budget document explicitly states "$312M deficit projected for FY 2022-23" when ESSER expires
- This validates the ~$240M structural gap

---

### FY 2020-21

**OLD:**
```javascript
{ year: '2020-21', deficit: 84, esser: 0 }
```

**NEW:**
```javascript
{
  year: '2020-21',
  structuralDeficit: 153,       // $153M ongoing gap
  deficitAfterOneTime: 84,      // Adopted deficit
  oneTimeFunds: 69,             // $45.3M state + $24.1M reserves
  oneTimeReserves: 24,
  esser: 0,
}
```

**Calculation:**
- COVID-19 year with significant one-time state "Learning Loss" funding
- Adopted deficit: $84M
- One-time funds: $45.3M state + $24.1M reserves = $69M
- Structural deficit: $84M + $69M = $153M

---

## Summary Table

| Year | Structural Deficit | Deficit After One-Time | One-Time Funds | ESSER | Reserves |
|------|-------------------|------------------------|----------------|-------|----------|
| 2020-21 | $153M | $84M | $69M | $0 | $24M |
| 2021-22 | $240M | $100M | $140M | $140M | $0 |
| 2022-23 | $225M | $0 | $176M | $100M | $0 |
| 2023-24 | $103M ⚠️ | $103M ⚠️ | $60M | $60M | $0 |
| 2024-25 | $159M | $52M | $107M | $10M | $97M |
| 2025-26 | $99M | $0 | $225M | $0 | $225M |

**⚠️** = On hold, needs verification

---

## Key Insights Revealed

### 1. **Structural Deficit Masked by ESSER (2021-2023)**

The district had a **$225-240M structural deficit** for years, masked by federal ESSER funds:
- FY 2021-22: $240M structural, only $100M visible after $140M ESSER
- FY 2022-23: $225M structural, balanced "on paper" with $176M one-time funds

### 2. **Reserve Depletion Accelerating (2024-2026)**

As ESSER expired, the district shifted to depleting reserves:
- FY 2024-25: $97M reserves used
- FY 2025-26: $225M reserves used
- **Total reserve drawdown**: $322M over 2 years

### 3. **Persistent Structural Gap**

Even after $113.8M in cuts (2025-26), a **$99M structural deficit remains**:
- One-time reserves are being depleted to balance budgets
- Without additional cuts or revenue, future deficits will grow

### 4. **"Balanced Budget" ≠ Fiscally Healthy**

FY 2025-26 shows as "balanced" ($0 deficit after one-time), but:
- $99M structural gap persists
- $225M in reserves used (one-time)
- When reserves run out, the $99M gap returns

---

## Changes to Other Arrays

### `adoptedBudgets` Array

**BEFORE:**
```javascript
{ year: '2025-26', budget: 1200, deficit: 0, source: '...' }
```

**AFTER:**
```javascript
{
  year: '2025-26',
  budget: 1200,
  deficitAfterOneTime: 0,
  structuralDeficit: 99,
  source: '...'
}
```

### `deficitTimeline` Array

**BEFORE:**
```javascript
{ year: '2025-26', deficit: 0, action: '$113.8M in cuts → first balanced budget' }
```

**AFTER:**
```javascript
{
  year: '2025-26',
  structuralDeficit: 99,
  deficitAfterOneTime: 0,
  action: '$113.8M cuts + $225M reserves → balanced'
}
```

---

## Code Changes Summary

**Files Modified:**
- `/Users/sbuss/workspace/sfusd-finances/app/data.ts`

**Arrays Updated:**
- ✅ `budgetData` (6 entries)
- ✅ `adoptedBudgets` (6 entries)
- ✅ `deficitTimeline` (6 entries)

**Total Changes:**
- 18 budget year entries updated
- 2 new fields added: `structuralDeficit`, `deficitAfterOneTime`
- 2 new fields added: `oneTimeFunds`, `oneTimeReserves`
- 1 old field removed: `deficit` (replaced)
- Header comments added explaining field definitions

---

## Next Steps

### Immediate (Research Team)
1. **Resolve FY 2023-24 discrepancy**: Verify source of $103M vs calculated $50M
2. **Review calculations**: Validate one-time fund amounts for accuracy
3. **Update visualizations**: Modify charts to use new deficit fields

### Short-term (Data Updates)
1. **Update TypeScript types**: Add interfaces for new structure
2. **Update chart components**: Use `structuralDeficit` vs `deficitAfterOneTime` appropriately
3. **Add tooltips**: Explain difference between deficit types to users

### Long-term (Future Enhancements)
1. **Track reserve levels**: Show how reserves are being depleted over time
2. **Projection modeling**: Show future deficits as reserves run out
3. **Add commentary**: Explain why "balanced budget" still has structural problems

---

## Validation Checklist

Before deploying these changes:

- [x] All FY 2020-21 through 2025-26 entries updated
- [x] FY 2023-24 marked as "HOLD" with comments
- [x] `adoptedBudgets` array updated
- [x] `deficitTimeline` array updated
- [x] Header comments added explaining field definitions
- [ ] TypeScript types updated (if using types)
- [ ] Chart components reviewed and updated
- [ ] Test app builds successfully
- [ ] Visualizations render correctly
- [ ] Research team approves FY 2023-24 resolution

---

## Sources Referenced

1. **FY 2025-26 Adopted Budget SACS Forms** - Operating deficit: $98.68M (Page 1, Form 01)
2. **FY 2024-25 Adopted Budget SACS Forms** - Operating deficit: $148.52M (Page 1, Form 01)
3. **FY 2023-24 Budget Overview** - Fund balance analysis (Page 27, Exhibit 2)
4. **FY 2022-23 Budget Overview** - Mitigation plan: $49M cuts + $76M one-time (Page 3)
5. **FY 2021-22 Budget Overview** - ESSER usage and future projections (Page 20-21)
6. **FY 2020-21 Budget Overview (Revised)** - Learning Loss funding: $45.3M (Page 4)

---

*End of Changelog*
