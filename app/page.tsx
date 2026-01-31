'use client'

import { budgetData, revenueVsSpending, enrollmentData, dollarBreakdown, esserFunding, deficitTimeline, sources } from './data'
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

/* eslint-disable @typescript-eslint/no-explicit-any */

// --- Nav ---
const navItems = [
  { id: 'snapshot', label: 'Snapshot' },
  { id: 'deficit', label: 'Deficit' },
  { id: 'dollar', label: 'The Dollar' },
  { id: 'covid', label: 'COVID Cliff' },
  { id: 'enrollment', label: 'Enrollment' },
  { id: 'strike', label: 'Teachers' },
  { id: 'future', label: 'What\'s Next' },
  { id: 'sources', label: 'Sources' },
]

// --- Components ---
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <span className="text-sm font-semibold tracking-tight text-gray-900">SFUSD Finances</span>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <a key={item.id} href={`#${item.id}`}
                className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

function Section({ id, children, className = '' }: {
  id?: string, children: React.ReactNode, className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      {children}
    </section>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200/60 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

function SectionHeader({ eyebrow, title, description }: {
  eyebrow?: string, title: string, description?: string
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">{eyebrow}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {description && (
        <p className="mt-3 text-base text-gray-500 max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  )
}

function StatCard({ label, value, detail, accent }: {
  label: string, value: string, detail?: string, accent?: 'red' | 'amber' | 'green' | 'blue'
}) {
  const colors = {
    red: 'text-red-600',
    amber: 'text-amber-600',
    green: 'text-emerald-600',
    blue: 'text-blue-600',
  }
  return (
    <div className="p-5">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl sm:text-3xl font-bold mt-1.5 tracking-tight ${accent ? colors[accent] : 'text-gray-900'}`}>{value}</p>
      {detail && <p className="text-xs text-gray-400 mt-1">{detail}</p>}
    </div>
  )
}

function Callout({ children, variant = 'info' }: {
  children: React.ReactNode, variant?: 'info' | 'warning' | 'insight'
}) {
  const styles = {
    info: 'bg-blue-50/50 border-blue-200/60 text-blue-900',
    warning: 'bg-amber-50/50 border-amber-200/60 text-amber-900',
    insight: 'bg-gray-50 border-gray-200/60 text-gray-700',
  }
  return (
    <div className={`border rounded-xl p-5 text-sm leading-relaxed ${styles[variant]}`}>
      {children}
    </div>
  )
}

function ChartCard({ title, subtitle, children }: {
  title: string, subtitle?: string, children: React.ReactNode
}) {
  return (
    <Card className="overflow-hidden">
      <div className="px-6 pt-5 pb-2">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-4 pb-4">
        {children}
      </div>
    </Card>
  )
}

// --- Tooltip Styles ---
const tooltipStyle = {
  contentStyle: {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '8px 12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    fontSize: '13px',
  },
}

// --- Main Page ---
export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">

        {/* Hero */}
        <div className="pt-16 sm:pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Updated Jan 31, 2026
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Where Does the<br />Money Go?
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-xl leading-relaxed">
            A clear, data-driven look at SFUSD&apos;s $1.2 billion budget.
            No jargon. No spin. Just public data, explained for parents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#deficit" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Read the report ↓
            </a>
            <a href="#sources" className="inline-flex items-center px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              View sources
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <Section id="snapshot" className="pb-16">
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
              <StatCard label="Total Budget" value="$1.2B" detail="FY 2025-26 operating" />
              <StatCard label="Students" value="48K" detail="Down from 53K in 2019" />
              <StatCard label="Per Student" value="$25K" detail="Per pupil spending" />
              <StatCard label="Staff Costs" value="80%" detail="Of total budget" />
            </div>
          </Card>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <Card>
              <StatCard label="Cuts (This Year)" value="$114M" accent="red" />
            </Card>
            <Card>
              <StatCard label="Cuts (Next Year)" value="$59M" accent="red" />
            </Card>
            <Card>
              <StatCard label="COVID $ Left" value="$0" accent="amber" detail="$330M+ spent" />
            </Card>
            <Card>
              <StatCard label="Peak Enrollment" value="93K" detail="1967 — nearly 2× today" />
            </Card>
          </div>
        </Section>

        {/* Deficit */}
        <Section id="deficit" className="pb-16">
          <SectionHeader
            eyebrow="The core question"
            title="Is there actually a deficit?"
            description="Yes — it's structural. SFUSD spent more than it earned every year from 2020 to 2025. Federal COVID money masked the problem. Now that money is gone."
          />

          <div className="space-y-4">
            <ChartCard
              title="Revenue vs. Spending"
              subtitle="The gap between the lines is the deficit. It closes only after $114M in cuts."
            >
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={revenueVsSpending} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                    tickFormatter={(v: any) => `$${v / 1000}B`} domain={[900, 1400]} />
                  <Tooltip {...tooltipStyle}
                    formatter={((v: any) => [`$${Number(v).toLocaleString()}M`, '']) as any}
                    labelFormatter={((l: any) => `FY ${l}`) as any} />
                  <Area type="monotone" dataKey="spending" fill="url(#spendGrad)" stroke="#ef4444" strokeWidth={2} name="Spending" dot={false} />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: '#2563eb' }} name="Revenue" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            <Callout variant="info">
              <strong>What &quot;structural deficit&quot; means:</strong> Imagine earning $5,000/month but spending $5,500.
              You cover the gap with savings — until you can&apos;t. SFUSD&apos;s &quot;savings&quot; was $330M+ in COVID relief.
              Now it&apos;s gone.
            </Callout>

            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Deficit timeline</h3>
              <div className="space-y-3">
                {deficitTimeline.map((d) => (
                  <div key={d.year} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-400 w-14 shrink-0">{d.year}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.max((d.deficit / 130) * 100, 2)}%`,
                              backgroundColor: d.deficit === 0 ? '#10b981' : '#ef4444',
                            }}
                          />
                        </div>
                        <span className={`text-xs font-semibold w-20 text-right ${d.deficit === 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {d.deficit === 0 ? 'Balanced' : `$${d.deficit}M`}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{d.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* Dollar Breakdown */}
        <Section id="dollar" className="pb-16">
          <SectionHeader
            eyebrow="Following the money"
            title="For every $1 SFUSD spends"
            description="About 60¢ reaches classrooms. The rest goes to benefits, admin, and facilities."
          />

          <Card className="p-6">
            <div className="space-y-4">
              {dollarBreakdown.map((item) => (
                <div key={item.category} className="flex items-center gap-4">
                  <div className="w-32 sm:w-40 shrink-0">
                    <p className="text-sm font-medium text-gray-900">{item.category}</p>
                    <p className="text-[11px] text-gray-400 hidden sm:block">{item.description}</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${Math.max(item.amount * 100, 4)}%`, backgroundColor: item.color }}
                      >
                        <span className="text-[11px] font-bold text-white drop-shadow-sm">
                          {(item.amount * 100).toFixed(0)}¢
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Callout variant="insight">
            <strong>The 22¢ you can&apos;t control:</strong> Benefits & pensions include mandatory CalSTRS/CalPERS
            retirement contributions set by the state. Districts have no say in these rates.
            They&apos;ve been rising for a decade.
          </Callout>
        </Section>

        {/* COVID Cliff */}
        <Section id="covid" className="pb-16">
          <SectionHeader
            eyebrow="The hidden story"
            title="The COVID money cliff"
            description="$330M+ in federal relief papered over the deficit. It ran out in 2024. That's why cuts are happening now."
          />

          <ChartCard
            title="Federal COVID Relief (ESSER) by Year"
            subtitle="Peak: $140M in 2021-22. Now: $0."
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={esserFunding} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: any) => `$${v}M`} />
                <Tooltip {...tooltipStyle} formatter={((v: any) => [`$${v}M`, '']) as any} />
                <Bar dataKey="esserI" stackId="a" fill="#bfdbfe" name="ESSER I" radius={[0, 0, 0, 0]} />
                <Bar dataKey="esserII" stackId="a" fill="#60a5fa" name="ESSER II" />
                <Bar dataKey="esserIII" stackId="a" fill="#2563eb" name="ESSER III" radius={[4, 4, 0, 0]} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <Callout variant="warning">
            <strong>The core problem:</strong> ESSER was one-time money used for ongoing costs (teachers, counselors).
            When it expired, those positions had to be cut. This is happening in school districts across the entire country.
          </Callout>

          <Card className="p-6 mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Other financial hits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">$35M</p>
                <p className="text-xs text-gray-500 mt-1">Lost to a flawed payroll system</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">$20M</p>
                <p className="text-xs text-gray-500 mt-1">Cost to replace that system</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">$30M</p>
                <p className="text-xs text-gray-500 mt-1">Unbudgeted special ed teachers (2024-25)</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* Enrollment */}
        <Section id="enrollment" className="pb-16">
          <SectionHeader
            eyebrow="The demographic shift"
            title="Fewer students, same fixed costs"
            description="Enrollment is down 7.6% since 2019. But buildings, admin, and infrastructure don't shrink with the student count."
          />

          <ChartCard
            title="Enrollment vs. Per-Pupil Spending"
            subtitle="Per-pupil rises as enrollment falls — but that doesn't mean kids get more."
          >
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={enrollmentData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: any) => `${(v/1000).toFixed(0)}K`} domain={[44000, 55000]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: any) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip {...tooltipStyle}
                  formatter={((value: any, name: any) => [
                    name === 'Enrollment' ? Number(value).toLocaleString() : `$${Number(value).toLocaleString()}`,
                    name
                  ]) as any} />
                <Bar yAxisId="left" dataKey="enrollment" fill="#e0e7ff" name="Enrollment" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="perPupil" stroke="#f59e0b" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#f59e0b' }} name="Per-Pupil Spending" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          <Callout variant="insight">
            <strong>Where are students going?</strong> Private schools serve 29-34% of SF students.
            One in seven 5th graders leaves before 6th grade. In 1967, SFUSD had 93,000 students — nearly double today.
          </Callout>
        </Section>

        {/* Teacher Pay / Strike */}
        <Section id="strike" className="pb-16">
          <SectionHeader
            eyebrow="The human side"
            title="The teacher pay question"
            description="Teachers can't afford San Francisco. The district can't afford raises. Both things are true."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <h3 className="text-sm font-semibold text-gray-900">What the union says</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  Starting salary: ~$79K in a city where 1BR rent is $38K/yr
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  49% of pre-tax income goes to rent alone
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  District&apos;s 6% offer over 3 years comes with concessions
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  Asked to give up prep periods and sabbaticals
                </li>
              </ul>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <h3 className="text-sm font-semibold text-gray-900">What the district says</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  80% of budget already goes to staff
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  Just cut $114M to balance the budget
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  Another $59M in cuts coming for 2026-27
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-300 shrink-0">→</span>
                  A 3% annual raise costs ~$20-25M/year
                </li>
              </ul>
            </Card>
          </div>

          <Callout variant="info">
            <strong>Both sides have a point.</strong> This isn&apos;t heroes vs. villains — it&apos;s a math problem created
            by decades of enrollment decline, rising costs, and one-time funding. A state fact-finding report
            drops <strong>February 4</strong>. After that, the union can legally strike.
          </Callout>
        </Section>

        {/* What's Next */}
        <Section id="future" className="pb-16">
          <SectionHeader
            eyebrow="Looking ahead"
            title="What comes next"
            description="The district has made real progress — upgraded to 'Qualified' certification in Dec 2025. But hard tradeoffs remain."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '📉', title: '$59M more in cuts', desc: 'Fiscal stabilization requires additional reductions in 2026-27 to end deficit spending permanently.' },
              { icon: '🏫', title: 'School consolidations', desc: '48K students in ~115 schools. Many are under-enrolled. Consolidation saves money but is politically painful.' },
              { icon: '🗳️', title: 'Local revenue measures', desc: 'Parcel taxes provide ~$100M/year. Future ballot measures could increase funding — but need voter approval.' },
              { icon: '🏛️', title: 'Funding uncertainty', desc: 'LCFF depends on state budget health. Federal education funding faces potential cuts. Both are risks.' },
            ].map((item) => (
              <Card key={item.title} className="p-5">
                <p className="text-lg mb-2">{item.icon}</p>
                <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* What Parents Can Do */}
        <Section id="action" className="pb-16">
          <SectionHeader title="What parents can do" description="Informed parents make better advocates." />
          <Card className="divide-y divide-gray-100">
            {[
              { icon: '📖', title: 'Read the actual budget documents', desc: 'They\'re public. Links below. Don\'t rely on secondhand summaries.' },
              { icon: '🗣️', title: 'Attend Board of Education meetings', desc: 'Budget discussions happen at public meetings. Your voice matters.' },
              { icon: '🤝', title: 'Join your school\'s Site Council or PTA', desc: 'School-level budgets use the Weighted Student Formula. Your council decides.' },
              { icon: '📊', title: 'Share this report', desc: 'The more parents who understand the numbers, the better the conversation.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 px-6 py-4">
                <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        {/* Methodology */}
        <Section className="pb-16">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Methodology & caveats</h3>
            <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
              <p>This report uses publicly available data from SFUSD official budget documents, press releases, and board meeting materials.</p>
              <p><strong>Estimated:</strong> Some FY 2020-21 figures and the spending breakdown are approximated. The dollar breakdown uses SFUSD&apos;s stated ~80% staff ratio and typical CA district patterns.</p>
              <p><strong>Not included yet:</strong> Peer district comparison, school-by-school spending, bond funds, detailed special ed breakdown.</p>
              <p><strong>Corrections welcome.</strong> If you spot an error or have additional data, please reach out.</p>
            </div>
          </Card>
        </Section>

        {/* Sources */}
        <Section id="sources" className="pb-16">
          <SectionHeader title="Sources" description="Every number links to an official public document." />
          <Card className="divide-y divide-gray-100 overflow-hidden">
            {sources.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                className="block px-6 py-3 hover:bg-gray-50 transition-colors group">
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{s.label}</p>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">{s.url}</p>
              </a>
            ))}
          </Card>
        </Section>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-gray-200/60 text-center">
          <p className="text-xs text-gray-400">
            Not affiliated with SFUSD, UESF, or any political organization.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Made with care for the SF parent community · January 2026
          </p>
        </footer>
      </main>
    </>
  )
}
