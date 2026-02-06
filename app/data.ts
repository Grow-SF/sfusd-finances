// SFUSD Financial Data — All figures from official SFUSD budget documents
// Sources cited inline. All dollar amounts in millions unless noted.
//
// Deficit Definitions:
// - structuralDeficit: Ongoing revenues minus ongoing expenses (excludes ALL one-time funds)
// - deficitAfterOneTime: Deficit remaining after applying one-time funds (adopted/final)
// - oneTimeFunds: Total one-time revenue sources (ESSER, state relief, reserve drawdowns)
// - oneTimeReserves: Reserve drawdowns specifically (subset of oneTimeFunds)

export const budgetData = [
  {
    year: "2020-21",
    totalBudget: 1100,
    lcff: 531,
    peef: 76.7, // City Controller estimate, May 13, 2020 (Budget Overview Page 19)
    parcelTax: 45.04, // QTEA only: $32.1M (UESF MOU) + $12.9M (non-MOU) (Budget Overview Page 20)
    enrollment: 51800,
    structuralDeficit: 153,
    deficitAfterOneTime: 84,
    oneTimeFunds: 69,
    oneTimeReserves: 24,
    esser: 0,
  },
  {
    year: "2021-22",
    totalBudget: 1160,
    lcff: 551,
    peef: 75.8,
    parcelTax: 93.5,
    enrollment: 49200,
    structuralDeficit: 240,
    deficitAfterOneTime: 100,
    oneTimeFunds: 140,
    oneTimeReserves: 0,
    esser: 140,
  },
  {
    year: "2022-23",
    totalBudget: 1100,
    lcff: 571,
    peef: 88.9,
    parcelTax: 94.9,
    enrollment: 48785,
    structuralDeficit: 225,
    deficitAfterOneTime: 0,
    oneTimeFunds: 176,
    oneTimeReserves: 0,
    esser: 100,
  },
  {
    year: "2023-24",
    totalBudget: 1280,
    lcff: 645,
    peef: 90.3,
    parcelTax: 101.1,
    enrollment: 49000,
    structuralDeficit: 103, // HOLD - needs verification
    deficitAfterOneTime: 103, // HOLD - needs verification
    oneTimeFunds: 60,
    oneTimeReserves: 0,
    esser: 60,
  },
  {
    year: "2024-25",
    totalBudget: 1300,
    lcff: 631,
    peef: 94.3,
    parcelTax: 104.3,
    enrollment: 48000,
    structuralDeficit: 159,
    deficitAfterOneTime: 52,
    oneTimeFunds: 107,
    oneTimeReserves: 97,
    esser: 10,
  },
  {
    year: "2025-26",
    totalBudget: 1200,
    lcff: 648,
    peef: 94,
    parcelTax: 107.59,
    enrollment: 48000,
    structuralDeficit: 99,
    deficitAfterOneTime: 0,
    oneTimeFunds: 225,
    oneTimeReserves: 225,
    esser: 0,
    cuts: 113.8,
  },
];

// Revenue vs Spending — from SFUSD Board-adopted budgets and press releases.
// Note: These are adopted (planned) budget figures, not audited actuals.
// Revenue = budget total minus projected deficit. Spending = adopted budget total.
export const revenueVsSpending = [
  {
    year: "2020-21",
    revenue: 1016,
    spending: 1100,
    label: "COVID year — fed relief masks gap",
  },
  {
    year: "2021-22",
    revenue: 1060,
    spending: 1160,
    label: "$140M ESSER funds offset deficit",
  },
  {
    year: "2022-23",
    revenue: 975,
    spending: 1100,
    label: "$125M structural deficit",
  },
  {
    year: "2023-24",
    revenue: 1177,
    spending: 1280,
    label: "LCFF jumps 12.9%, spending rises too",
  },
  {
    year: "2024-25",
    revenue: 1248,
    spending: 1300,
    label: 'CDE certification → "Negative"',
  },
  {
    year: "2025-26",
    revenue: 1200,
    spending: 1200,
    label: "Balanced budget ($114M in cuts)",
  },
];

// Adopted budget totals from SFUSD Board press releases + deficit amounts from Board resolutions
// Note: deficitAfterOneTime represents the adopted/final deficit after applying one-time funds
export const adoptedBudgets = [
  {
    year: "2020-21",
    budget: 1100,
    deficitAfterOneTime: 84,
    structuralDeficit: 153,
    source: "SFUSD Board adopted budget",
  },
  {
    year: "2021-22",
    budget: 1160,
    deficitAfterOneTime: 100,
    structuralDeficit: 240,
    source: "SFUSD Board adopted budget",
  },
  {
    year: "2022-23",
    budget: 1100,
    deficitAfterOneTime: 0,
    structuralDeficit: 225,
    source: "SFUSD Board press release, June 2022",
  },
  {
    year: "2023-24",
    budget: 1280,
    deficitAfterOneTime: 103, // HOLD - needs verification
    structuralDeficit: 103, // HOLD - needs verification
    source: "SFUSD Board press release, June 2023",
  },
  {
    year: "2024-25",
    budget: 1300,
    deficitAfterOneTime: 52,
    structuralDeficit: 159,
    source: "SFUSD Board press release, June 2024",
  },
  {
    year: "2025-26",
    budget: 1200,
    deficitAfterOneTime: 0,
    structuralDeficit: 99,
    source: "SFUSD Board press release, June 2025",
  },
];

export const enrollmentData = [
  { year: "2019-20", enrollment: 52800, perPupil: 20833 },
  { year: "2020-21", enrollment: 51800, perPupil: 21236 },
  { year: "2021-22", enrollment: 49200, perPupil: 23577 },
  { year: "2022-23", enrollment: 48785, perPupil: 22546 },
  { year: "2023-24", enrollment: 49000, perPupil: 26122 },
  { year: "2024-25", enrollment: 48000, perPupil: 27083 },
  { year: "2025-26", enrollment: 48000, perPupil: 25000 },
];

// Where every dollar goes (approximate, based on SFUSD budget breakdowns)
export const dollarBreakdown = [
  {
    category: "Teacher Salaries",
    amount: 0.38,
    color: "#1e40af",
    description: "Classroom teachers (all grades)",
  },
  {
    category: "Benefits & Pensions",
    amount: 0.22,
    color: "#3b82f6",
    description: "Health insurance, STRS/PERS retirement",
  },
  {
    category: "Other Staff",
    amount: 0.12,
    color: "#60a5fa",
    description: "Paraprofessionals, counselors, nurses",
  },
  {
    category: "Special Education",
    amount: 0.1,
    color: "#93c5fd",
    description: "Specialized instruction & services",
  },
  {
    category: "Admin & Central Office",
    amount: 0.08,
    color: "#f59e0b",
    description: "District office, HR, finance, legal",
  },
  {
    category: "Facilities & Maintenance",
    amount: 0.05,
    color: "#10b981",
    description: "Building upkeep, custodial, utilities",
  },
  {
    category: "Materials & Supplies",
    amount: 0.03,
    color: "#6366f1",
    description: "Textbooks, technology, classroom supplies",
  },
  {
    category: "Other",
    amount: 0.02,
    color: "#94a3b8",
    description: "Transportation, food service, misc",
  },
];

export const esserFunding = [
  { year: "2020-21", esserI: 24, esserII: 0, esserIII: 0, total: 24 },
  { year: "2021-22", esserI: 20, esserII: 60, esserIII: 60, total: 140 },
  { year: "2022-23", esserI: 0, esserII: 40, esserIII: 60, total: 100 },
  { year: "2023-24", esserI: 0, esserII: 0, esserIII: 60, total: 60 },
  { year: "2024-25", esserI: 0, esserII: 0, esserIII: 10, total: 10 },
  { year: "2025-26", esserI: 0, esserII: 0, esserIII: 0, total: 0 },
];

export const deficitTimeline = [
  {
    year: "2020-21",
    structuralDeficit: 153,
    deficitAfterOneTime: 84,
    action: "COVID year — $69M one-time state funds + reserves",
  },
  {
    year: "2021-22",
    structuralDeficit: 240,
    deficitAfterOneTime: 100,
    action: "ESSER funds ($140M) mask $240M structural gap",
  },
  {
    year: "2022-23",
    structuralDeficit: 225,
    deficitAfterOneTime: 0,
    action: "$49M cuts + $176M one-time funds (ESSER + state)",
  },
  {
    year: "2023-24",
    structuralDeficit: 103, // HOLD - needs verification
    deficitAfterOneTime: 103, // HOLD - needs verification
    action: "Board adopts $103M reduction plan",
  },
  {
    year: "2024-25",
    structuralDeficit: 159,
    deficitAfterOneTime: 52,
    action: 'CDE "Negative" certification, 535 positions cut',
  },
  {
    year: "2025-26",
    structuralDeficit: 99,
    deficitAfterOneTime: 0,
    action: "$113.8M cuts + $225M reserves → balanced",
  },
];

// Interim Reports — Mid-year budget revisions showing actual vs. adopted projections
// These reports are issued twice per year (First Interim ~December, Second Interim ~March)
// and show how actual revenues/expenditures are tracking against the adopted budget.
// Source: SFUSD Board presentations and SACS certifications
export const interimReports = [
  {
    year: "2025-26",
    reportType: "First Interim",
    reportDate: "2024-12-09",
    unrestricted: {
      beginningBalance: 221.2,
      revenues: 744.5,
      expenditures: 796.0,
      deficit: 51.5,
      endingBalance: 169.7,
    },
    restricted: {
      beginningBalance: 207.7,
      revenues: 547.1,
      expenditures: 597.9,
      deficit: 50.8,
      endingBalance: 156.9,
    },
    combined: {
      revenues: 1291.6,
      expenditures: 1393.9,
      deficit: 102.3,
    },
    certification: "Qualified",
    multiYearProjections: [
      { year: "2025-26", deficit: 51.5 },
      { year: "2026-27", deficit: 32.0 },
      { year: "2027-28", deficit: 19.0 },
    ],
    comparisonToAdopted: {
      adoptedBudget: 1200,
      revisedBudget: 1291.6,
      adoptedDeficit: 0,
      revisedDeficit: 102.3,
      variance: 102.3,
    },
    source: "First Interim Report, December 9, 2024",
    notes:
      "Budget increased from $1,200M adopted to $1,291.6M at 1st Interim. Certification downgraded from balanced to Qualified. Combined deficit of $102.3M ($51.5M unrestricted + $50.8M restricted).",
  },
];

export const teacherPay = {
  sfusdStarting: 69000,
  sfusdTop: 110000,
  sfMedianRent1BR: 3200 * 12, // $38,400/yr
  sfMedianRent2BR: 4200 * 12, // $50,400/yr
  caAverageTeacher: 95000,
  costOfLivingIndex: 1.82, // SF vs national avg
  adjustedNationalAvg: 69000, // national avg ~$66k adjusted down
};

export const keyFacts = {
  totalStudents: "~48,000",
  totalBudget: "$1.2 billion",
  perPupilSpending: "~$25,000",
  teacherCount: "~3,000",
  schoolCount: "~115",
  staffPctOfBudget: "~80%",
  classroomPctOfBudget: "~60%",
  adminPctOfBudget: "~8%",
  enrollmentPeak: "93,000 (1967)",
  enrollmentNow: "48,000 (2025)",
  esserTotal: "~$330M received (2020-2024)",
  cutsThisYear: "$113.8M",
  cutsNextYear: "$59M additional planned",
};

export const sources = [
  {
    label: "FY 2025-26 Adopted Budget",
    url: "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2025-06-24-sf-board-education-adopts-budget-2025-26-school-year",
  },
  {
    label: "FY 2024-25 Adopted Budget",
    url: "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2024-06-27-sf-board-education-adopts-plan-and-budget-2024-25-school-year",
  },
  {
    label: "FY 2023-24 Adopted Budget",
    url: "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2023-06-22-sf-board-education-adopts-plan-and-budget-2023-24-school-year",
  },
  {
    label: "FY 2022-23 Adopted Budget",
    url: "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2022-06-29-sf-board-education-adopts-plan-and-budget-2022-23-school-year",
  },
  {
    label: "FY 2021-22 Adopted Budget",
    url: "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2021-06-23-sf-board-education-approves-budget-2021-22-school-year",
  },
  {
    label: "FY 2025-26 First Interim Report",
    url: "https://go.boarddocs.com/ca/sfusd/Board.nsf/files/DP2V8U7F8998/$file/2026-12-09%201st%20Interim%20Report%20Presentation.pdf",
  },
  {
    label: "FY 2024-25 First Interim Report",
    url: "https://go.boarddocs.com/ca/sfusd/Board.nsf/files/DBU7D7191213/$file/%5BUpdated-12.10.24-final%5DSFUSD-1st_Interim-24-25.pdf",
  },
  {
    label: "Budget & LCAP Archives",
    url: "https://www.sfusd.edu/about-sfusd/budget-and-lcap/budget-and-lcaps-previous-fiscal-years",
  },
  {
    label: "Budget FAQ (2025-26)",
    url: "https://www.sfusd.edu/about-sfusd/budget-and-lcap/budget-faqs/budget-faqs-budget-development-2025-26",
  },
  {
    label: "Dec 2025 Fiscal Milestone",
    url: "https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2025-12-05-sfusd-reaches-major-milestone-restore-local-control",
  },
  {
    label: "KQED: Teachers Union Strike",
    url: "https://www.kqed.org/news/12071181/san-francisco-teachers-union-moves-closer-to-a-historic-strike-first-in-more-than-50-years",
  },
  {
    label: "SFEDup: SFUSD's Biggest Liability (OPEB Analysis)",
    url: "https://sfeducation.substack.com/p/sfusds-biggest-liability",
  },
  {
    label: "CDE Current Expense of Education (Audited Expenditures)",
    url: "https://www.cde.ca.gov/ds/fd/ec/currentexpense.asp",
  },
  {
    label: "Brookings: Declining Public School Enrollment (Aug 2025)",
    url: "https://www.brookings.edu/articles/declining-public-school-enrollment/",
  },
];
