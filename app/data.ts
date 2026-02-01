// SFUSD Financial Data — All figures from official SFUSD budget documents
// Sources cited inline. All dollar amounts in millions unless noted.

export const budgetData = [
  { year: '2020-21', totalBudget: 1100, lcff: 531, peef: null, parcelTax: null, enrollment: 51800, deficit: 84, esser: 0 },
  { year: '2021-22', totalBudget: 1160, lcff: 551, peef: 75.8, parcelTax: 93.5, enrollment: 49200, deficit: 100.2, esser: 140 },
  { year: '2022-23', totalBudget: 1100, lcff: 571, peef: 88.9, parcelTax: 94.9, enrollment: 48785, deficit: 125, esser: 100 },
  { year: '2023-24', totalBudget: 1280, lcff: 645, peef: 90.3, parcelTax: 101.1, enrollment: 49000, deficit: 103, esser: 60 },
  { year: '2024-25', totalBudget: 1300, lcff: 631, peef: 94.3, parcelTax: 104.3, enrollment: 48000, deficit: 51.9, esser: 10 },
  { year: '2025-26', totalBudget: 1200, lcff: 648, peef: 94, parcelTax: null, enrollment: 48000, deficit: 0, esser: 0, cuts: 113.8 },
]

export const revenueVsSpending = [
  { year: '2020-21', revenue: 1016, spending: 1100, label: 'COVID year — fed relief masks gap' },
  { year: '2021-22', revenue: 1060, spending: 1160, label: '$140M ESSER funds offset deficit' },
  { year: '2022-23', revenue: 1025, spending: 1100, label: '$125M structural deficit' },
  { year: '2023-24', revenue: 1177, spending: 1280, label: 'LCFF jumps 12.9%, spending rises too' },
  { year: '2024-25', revenue: 1249, spending: 1300, label: 'CDE certification → "Negative"' },
  { year: '2025-26', revenue: 1200, spending: 1200, label: 'First balanced budget ($114M in cuts)' },
]

export const enrollmentData = [
  { year: '2019-20', enrollment: 52800, perPupil: 20833 },
  { year: '2020-21', enrollment: 51800, perPupil: 21236 },
  { year: '2021-22', enrollment: 49200, perPupil: 23577 },
  { year: '2022-23', enrollment: 48785, perPupil: 22546 },
  { year: '2023-24', enrollment: 49000, perPupil: 26122 },
  { year: '2024-25', enrollment: 48000, perPupil: 27083 },
  { year: '2025-26', enrollment: 48000, perPupil: 25000 },
]

// Where every dollar goes (approximate, based on SFUSD budget breakdowns)
export const dollarBreakdown = [
  { category: 'Teacher Salaries', amount: 0.38, color: '#1e40af', description: 'Classroom teachers (all grades)' },
  { category: 'Benefits & Pensions', amount: 0.22, color: '#3b82f6', description: 'Health insurance, STRS/PERS retirement' },
  { category: 'Other Staff', amount: 0.12, color: '#60a5fa', description: 'Paraprofessionals, counselors, nurses' },
  { category: 'Special Education', amount: 0.10, color: '#93c5fd', description: 'Specialized instruction & services' },
  { category: 'Admin & Central Office', amount: 0.08, color: '#f59e0b', description: 'District office, HR, finance, legal' },
  { category: 'Facilities & Maintenance', amount: 0.05, color: '#10b981', description: 'Building upkeep, custodial, utilities' },
  { category: 'Materials & Supplies', amount: 0.03, color: '#6366f1', description: 'Textbooks, technology, classroom supplies' },
  { category: 'Other', amount: 0.02, color: '#94a3b8', description: 'Transportation, food service, misc' },
]

export const esserFunding = [
  { year: '2020-21', esserI: 24, esserII: 0, esserIII: 0, total: 24 },
  { year: '2021-22', esserI: 20, esserII: 60, esserIII: 60, total: 140 },
  { year: '2022-23', esserI: 0, esserII: 40, esserIII: 60, total: 100 },
  { year: '2023-24', esserI: 0, esserII: 0, esserIII: 60, total: 60 },
  { year: '2024-25', esserI: 0, esserII: 0, esserIII: 10, total: 10 },
  { year: '2025-26', esserI: 0, esserII: 0, esserIII: 0, total: 0 },
]

export const deficitTimeline = [
  { year: '2020-21', deficit: 84, action: 'Projected deficit — Board passes resolution' },
  { year: '2021-22', deficit: 100.2, action: 'ESSER funds ($140M) mask the problem' },
  { year: '2022-23', deficit: 125, action: '$49M cuts + $76M new revenue sources' },
  { year: '2023-24', deficit: 103, action: 'Board adopts $103M reduction plan' },
  { year: '2024-25', deficit: 51.9, action: 'CDE "Negative" certification, 535 positions cut' },
  { year: '2025-26', deficit: 0, action: '$113.8M in cuts → first balanced budget' },
]

export const teacherPay = {
  sfusdStarting: 69000,
  sfusdTop: 110000,
  sfMedianRent1BR: 3200 * 12, // $38,400/yr
  sfMedianRent2BR: 4200 * 12, // $50,400/yr
  caAverageTeacher: 95000,
  costOfLivingIndex: 1.82, // SF vs national avg
  adjustedNationalAvg: 69000, // national avg ~$66k adjusted down
}

export const keyFacts = {
  totalStudents: '~48,000',
  totalBudget: '$1.2 billion',
  perPupilSpending: '~$25,000',
  teacherCount: '~3,000',
  schoolCount: '~115',
  staffPctOfBudget: '~80%',
  classroomPctOfBudget: '~60%',
  adminPctOfBudget: '~8%',
  enrollmentPeak: '93,000 (1967)',
  enrollmentNow: '48,000 (2025)',
  esserTotal: '~$330M received (2020-2024)',
  cutsThisYear: '$113.8M',
  cutsNextYear: '$59M additional planned',
}

export const sources = [
  { label: 'FY 2025-26 Adopted Budget', url: 'https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2025-06-24-sf-board-education-adopts-budget-2025-26-school-year' },
  { label: 'FY 2024-25 Adopted Budget', url: 'https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2024-06-27-sf-board-education-adopts-plan-and-budget-2024-25-school-year' },
  { label: 'FY 2023-24 Adopted Budget', url: 'https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2023-06-22-sf-board-education-adopts-plan-and-budget-2023-24-school-year' },
  { label: 'FY 2022-23 Adopted Budget', url: 'https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2022-06-29-sf-board-education-adopts-plan-and-budget-2022-23-school-year' },
  { label: 'FY 2021-22 Adopted Budget', url: 'https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2021-06-23-sf-board-education-approves-budget-2021-22-school-year' },
  { label: 'FY 2024-25 First Interim Report', url: 'https://go.boarddocs.com/ca/sfusd/Board.nsf/files/DBU7D7191213/$file/%5BUpdated-12.10.24-final%5DSFUSD-1st_Interim-24-25.pdf' },
  { label: 'Budget & LCAP Archives', url: 'https://www.sfusd.edu/about-sfusd/budget-and-lcap/budget-and-lcaps-previous-fiscal-years' },
  { label: 'Budget FAQ (2025-26)', url: 'https://www.sfusd.edu/about-sfusd/budget-and-lcap/budget-faqs/budget-faqs-budget-development-2025-26' },
  { label: 'Dec 2025 Fiscal Milestone', url: 'https://www.sfusd.edu/about-sfusd/sfusd-news/press-releases/2025-12-05-sfusd-reaches-major-milestone-restore-local-control' },
  { label: 'KQED: Teachers Union Strike', url: 'https://www.kqed.org/news/12071181/san-francisco-teachers-union-moves-closer-to-a-historic-strike-first-in-more-than-50-years' },
  { label: 'SFEDup: SFUSD\'s Biggest Liability (OPEB Analysis)', url: 'https://sfeducation.substack.com/p/sfusds-biggest-liability' },
]
