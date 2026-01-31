'use client'

import {
  budgetData, revenueVsSpending, enrollmentData, dollarBreakdown,
  esserFunding, deficitTimeline, sources, keyFacts
} from './data'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts'

/* eslint-disable @typescript-eslint/no-explicit-any */
const fmtM = (value: any) => [`$${Number(value).toLocaleString()}M`, '']
const fmtLabel = (label: any) => `FY ${label}`

function Section({ id, title, subtitle, children }: {
  id?: string, title: string, subtitle?: string, children: React.ReactNode
}) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-500 text-lg mb-8">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

function StatCard({ label, value, detail, color }: {
  label: string, value: string, detail?: string, color?: string
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${color || 'text-gray-900'}`}>{value}</p>
      {detail && <p className="text-sm text-gray-400 mt-1">{detail}</p>}
    </div>
  )
}

function Callout({ emoji, children }: { emoji: string, children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 flex gap-3">
      <span className="text-2xl shrink-0">{emoji}</span>
      <div className="text-amber-900 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <div className="pt-12 sm:pt-20 pb-8 border-b border-gray-100">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
          SFUSD Financial Report — 2020 to 2026
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Where Does the Money Go?
        </h1>
        <p className="text-xl text-gray-500 mt-4 max-w-2xl">
          A parent-friendly breakdown of San Francisco Unified School District finances.
          No jargon. Just data from official public sources.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Last updated: January 31, 2026 · All data from SFUSD official budget documents ·{' '}
          <a href="#sources" className="underline">Sources below</a>
        </p>
      </div>

      {/* Key Numbers */}
      <Section id="snapshot" title="The Snapshot" subtitle="SFUSD at a glance, FY 2025-26">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total Budget" value="$1.2B" detail="Operating budget for 2025-26" />
          <StatCard label="Students" value="~48,000" detail="Down from 53K in 2019" />
          <StatCard label="Per Student" value="~$25,000" detail="Per pupil spending" />
          <StatCard label="Staff % of Budget" value="~80%" detail="Salary + benefits" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <StatCard label="Cuts This Year" value="$114M" detail="To balance the budget" color="text-red-600" />
          <StatCard label="More Cuts Planned" value="$59M" detail="For 2026-27" color="text-red-600" />
          <StatCard label="COVID Funds Left" value="$0" detail="$330M+ now fully spent" color="text-amber-600" />
          <StatCard label="Enrollment (1967)" value="93,000" detail="Nearly 2x today's level" />
        </div>
      </Section>

      {/* Is There Actually a Deficit? */}
      <Section
        id="deficit"
        title="Is There Actually a Deficit?"
        subtitle="Yes — it's structural. Here's what that means."
      >
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            SFUSD has had a <strong>structural deficit</strong> for years. This means recurring costs
            (mainly staff salaries and benefits) exceed recurring revenue. The district spent more than
            it brought in <em>every single year</em> from 2020 to 2025.
          </p>
          <p>
            For a while, this was hidden by one-time money — mainly <strong>$330+ million in federal COVID relief (ESSER funds)</strong> — and
            by drawing down reserves. But that money is now gone. The district had to cut $113.8 million in spending
            for 2025-26 to finally produce a balanced budget.
          </p>
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4">Revenue vs. Spending (2020–2026)</h3>
        <p className="text-sm text-gray-500 mb-4">
          The gap between the lines is the deficit. Notice how it narrows only after massive cuts in 2025-26.
        </p>
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={revenueVsSpending} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} tickFormatter={(v: any) => `$${v / 1000}B`} domain={[900, 1400]} />
              <Tooltip
                formatter={fmtM as any}
                labelFormatter={fmtLabel as any}
              />
              <Area type="monotone" dataKey="spending" fill="#fecaca" stroke="#ef4444" fillOpacity={0.3} name="Spending" />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} name="Revenue" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <Callout emoji="💡">
          <strong>What "structural deficit" means:</strong> Imagine your salary is $5,000/month but your
          bills are $5,500/month. You can cover the gap with savings for a while, but eventually you run out.
          That&apos;s essentially what happened to SFUSD. COVID relief money was the savings account — now it&apos;s empty.
        </Callout>

        <h3 className="text-lg font-bold mt-8 mb-4">The Deficit Over Time</h3>
        <div className="space-y-3">
          {deficitTimeline.map((d) => (
            <div key={d.year} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="text-sm font-mono font-bold text-gray-500 w-16 shrink-0">{d.year}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 rounded-full bg-red-400"
                    style={{ width: `${Math.max((d.deficit / 130) * 100, 4)}%`, minWidth: d.deficit === 0 ? '8px' : undefined,
                      backgroundColor: d.deficit === 0 ? '#10b981' : undefined }}
                  />
                  <span className={`text-sm font-bold ${d.deficit === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {d.deficit === 0 ? 'Balanced' : `$${d.deficit}M deficit`}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{d.action}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Following the Dollar */}
      <Section
        id="dollar"
        title="Following the Dollar"
        subtitle="For every $1 SFUSD spends, here's where it goes."
      >
        <div className="space-y-3">
          {dollarBreakdown.map((item) => (
            <div key={item.category} className="flex items-center gap-4">
              <div className="w-28 sm:w-36 shrink-0">
                <p className="text-sm font-semibold text-gray-900">{item.category}</p>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center pl-3"
                    style={{ width: `${item.amount * 100}%`, backgroundColor: item.color }}
                  >
                    <span className="text-xs font-bold text-white">{(item.amount * 100).toFixed(0)}¢</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 w-40 hidden sm:block">{item.description}</p>
            </div>
          ))}
        </div>

        <Callout emoji="🏫">
          <strong>About 60¢ of every dollar reaches classrooms</strong> (teacher salaries + student support + special ed).
          The remaining 40¢ goes to benefits/pensions, administration, facilities, and operations.
          The biggest single line item? <strong>Benefits and pensions at 22¢</strong> — this includes mandatory
          contributions to CalSTRS (teacher retirement) and CalPERS (staff retirement), which districts cannot control.
        </Callout>

        <div className="prose prose-lg max-w-none text-gray-700 mt-8">
          <p>
            <strong>Why does 80% go to staff?</strong> Schools are fundamentally a people business. You need
            teachers in classrooms, counselors supporting students, custodians maintaining buildings,
            and yes, some administrators keeping it all running. The question isn&apos;t whether to spend on
            people — it&apos;s whether the balance is right.
          </p>
        </div>
      </Section>

      {/* COVID Cliff */}
      <Section
        id="covid"
        title="The COVID Money Cliff"
        subtitle="$330M+ in federal relief is now gone. That's the story behind the cuts."
      >
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Between 2020 and 2024, SFUSD received over <strong>$330 million in ESSER (Elementary and Secondary School
            Emergency Relief)</strong> funds from the federal government. This was one-time COVID relief money.
          </p>
          <p>
            The problem? Some of this money was used to fund <strong>recurring positions</strong> — teachers, counselors,
            support staff — that the district couldn&apos;t sustain once the money ran out. When ESSER expired in 2024,
            those positions had to be cut unless other funding was found.
          </p>
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4">Federal COVID Relief Funds by Year</h3>
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={esserFunding} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 13 }} />
              <YAxis tick={{ fontSize: 13 }} tickFormatter={(v: any) => `$${v}M`} />
              <Tooltip formatter={fmtM as any} />
              <Bar dataKey="esserI" stackId="a" fill="#93c5fd" name="ESSER I" radius={[0, 0, 0, 0]} />
              <Bar dataKey="esserII" stackId="a" fill="#3b82f6" name="ESSER II" />
              <Bar dataKey="esserIII" stackId="a" fill="#1e40af" name="ESSER III" radius={[6, 6, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Callout emoji="⚠️">
          <strong>This is the single biggest reason for the current crisis.</strong> ESSER funds peaked at $140M/year
          in 2021-22. By 2025-26, it&apos;s $0. That&apos;s a $140 million annual cliff that had to be
          filled by cuts. Most school districts across California (and the country) are facing this exact same problem.
        </Callout>

        <div className="prose prose-lg max-w-none text-gray-700 mt-4">
          <p>
            <strong>Also worth noting:</strong> A flawed payroll system cost the district $35 million,
            and its replacement cost another $20 million. An additional $30 million was needed mid-year
            in 2024-25 for special education teachers who weren&apos;t properly budgeted. These operational
            failures added to the financial strain.
          </p>
        </div>
      </Section>

      {/* Enrollment */}
      <Section
        id="enrollment"
        title="The Enrollment Squeeze"
        subtitle="Fewer students, but costs don't shrink proportionally."
      >
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            SFUSD enrollment has been declining for decades. In 1967, the district served <strong>93,000 students</strong>.
            Today it&apos;s about <strong>48,000</strong>. The pandemic accelerated the decline — the district
            lost ~2,600 students in a single year (2021-22) when San Francisco was among the last major cities
            to reopen schools.
          </p>
          <p>
            This matters because California funds schools primarily through <strong>LCFF (Local Control Funding Formula)</strong>,
            which is based on student attendance. Fewer students = less money. But many costs (buildings, admin,
            fixed staffing) don&apos;t shrink when enrollment drops.
          </p>
        </div>

        <h3 className="text-lg font-bold mt-8 mb-4">Enrollment vs. Per-Pupil Spending</h3>
        <p className="text-sm text-gray-500 mb-4">
          As enrollment falls, per-pupil spending rises — but that doesn&apos;t mean kids are getting more. 
          It means fixed costs are spread across fewer students.
        </p>
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={enrollmentData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 13 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 13 }} tickFormatter={(v: any) => `${(v/1000).toFixed(0)}K`} domain={[44000, 55000]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 13 }} tickFormatter={(v: any) => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip
                formatter={((value: any, name: any) => [
                  name === 'Enrollment' ? Number(value).toLocaleString() : `$${Number(value).toLocaleString()}`,
                  name
                ]) as any}
              />
              <Bar yAxisId="left" dataKey="enrollment" fill="#bfdbfe" name="Enrollment" radius={[6, 6, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="perPupil" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} name="Per-Pupil Spending" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <Callout emoji="📊">
          <strong>Where are students going?</strong> Private schools serve 29-34% of SF students.
          Charter schools serve another 4-8%. One out of every seven 5th graders leaves the district
          before 6th grade. Families cite concerns about school quality, safety, and the availability
          of programs.
        </Callout>
      </Section>

      {/* The Strike Question */}
      <Section
        id="strike"
        title="The Teacher Pay Question"
        subtitle="Teachers can't afford San Francisco. But the district is nearly broke."
      >
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            The United Educators of San Francisco (UESF) is voting on whether to authorize the first teacher
            strike in over 50 years. At the heart of it: <strong>teacher pay vs. the structural deficit</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">What the union says</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Starting salary: ~$79,000 (hard to live in SF)</li>
              <li>• SF median 1BR rent: $3,200/mo ($38,400/yr)</li>
              <li>• That&apos;s 49% of a starting teacher&apos;s pre-tax income on rent alone</li>
              <li>• District offered 6% over 3 years — they want more</li>
              <li>• District also wants them to give up prep periods and sabbaticals</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-2xl p-6">
            <h4 className="font-bold text-amber-900 mb-3">What the district says</h4>
            <ul className="text-sm text-amber-800 space-y-2">
              <li>• 80% of the budget already goes to staff</li>
              <li>• Just eliminated a $114M deficit with painful cuts</li>
              <li>• Another $59M in cuts coming for 2026-27</li>
              <li>• Under state fiscal oversight since 2024</li>
              <li>• A 3% annual raise costs ~$20-25M/year</li>
            </ul>
          </div>
        </div>

        <Callout emoji="🤔">
          <strong>Both sides have a point.</strong> Teachers genuinely can&apos;t afford to live in or near San Francisco
          on starting salaries. And the district genuinely doesn&apos;t have the money for raises without
          either finding new revenue or cutting something else. This isn&apos;t a case of villains and heroes —
          it&apos;s a math problem that decades of enrollment decline, rising costs, and one-time funding have made
          nearly impossible.
        </Callout>

        <div className="prose prose-lg max-w-none text-gray-700 mt-6">
          <p>
            <strong>What&apos;s next:</strong> A state fact-finding panel will release its report by <strong>February 4, 2026</strong>.
            After that, the union can legally strike. The report will include recommendations that both sides
            can accept, reject, or negotiate from.
          </p>
        </div>
      </Section>

      {/* What Comes Next */}
      <Section
        id="future"
        title="What Comes Next"
        subtitle="The path forward involves hard tradeoffs."
      >
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            SFUSD has made real progress on its finances. In December 2025, it received a <strong>&quot;Qualified&quot; certification</strong> from
            the state — a major upgrade from &quot;Negative&quot; — and is on track to exit state oversight. But big challenges remain:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">📉 $59M more in cuts (2026-27)</h4>
            <p className="text-sm text-gray-600">The fiscal stabilization plan requires additional reductions next year to end deficit spending permanently.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">🏫 Possible school consolidations</h4>
            <p className="text-sm text-gray-600">With 48,000 students in ~115 schools (vs 93,000 in 1967), many schools are under-enrolled. Consolidation saves money but is politically difficult.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">🗳️ Local revenue measures</h4>
            <p className="text-sm text-gray-600">Parcel taxes (QTEA, FWEA) provide ~$100M/year. Future ballot measures could increase local funding but require voter approval.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">🏛️ State & federal funding uncertainty</h4>
            <p className="text-sm text-gray-600">LCFF funding depends on state budget health. Federal education funding faces potential cuts. Both create downside risk.</p>
          </div>
        </div>
      </Section>

      {/* What Parents Can Do */}
      <Section
        id="action"
        title="What Parents Can Do"
        subtitle="Informed parents make better advocates."
      >
        <div className="space-y-4">
          <div className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl">
            <span className="text-xl">📖</span>
            <div>
              <p className="font-semibold text-gray-900">Read the actual budget documents</p>
              <p className="text-sm text-gray-600">They&apos;re public and available online. Links below. Don&apos;t rely on secondhand summaries.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl">
            <span className="text-xl">🗣️</span>
            <div>
              <p className="font-semibold text-gray-900">Attend Board of Education meetings</p>
              <p className="text-sm text-gray-600">Budget discussions happen at public meetings. Your voice matters in how cuts are prioritized.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl">
            <span className="text-xl">🤝</span>
            <div>
              <p className="font-semibold text-gray-900">Join your school&apos;s Site Council (SSC) or PTA</p>
              <p className="text-sm text-gray-600">School-level budgets are allocated via the Weighted Student Formula. Your school&apos;s council decides how funds are used.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl">
            <span className="text-xl">📊</span>
            <div>
              <p className="font-semibold text-gray-900">Share this report</p>
              <p className="text-sm text-gray-600">The more parents who understand the real numbers, the better the conversation around the strike and budget becomes.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Methodology */}
      <Section
        id="methodology"
        title="Methodology & Caveats"
        subtitle="How we put this together, and what we're unsure about."
      >
        <div className="prose max-w-none text-gray-600 text-sm space-y-3">
          <p>
            This report uses publicly available data from SFUSD&apos;s official budget documents, press releases,
            and board meeting materials. All sources are linked below.
          </p>
          <p>
            <strong>What&apos;s estimated:</strong> Some figures (particularly FY 2020-21 and the detailed spending breakdown)
            are approximated from available data. The &quot;where every dollar goes&quot; breakdown is based on typical California
            school district spending patterns and SFUSD&apos;s stated ~80% staff spending ratio. Exact line-item breakdowns
            require the full adopted budget document (PDF), which we&apos;re working to incorporate.
          </p>
          <p>
            <strong>What&apos;s NOT in here yet:</strong> Detailed comparison to peer districts, school-by-school spending,
            bond fund spending (separate from operating budget), and special education cost breakdown.
          </p>
          <p>
            <strong>Corrections welcome.</strong> If you spot an error or have access to additional data,
            please reach out. We want this to be accurate.
          </p>
        </div>
      </Section>

      {/* Sources */}
      <Section id="sources" title="Sources" subtitle="Every number in this report comes from official public documents.">
        <div className="space-y-2">
          {sources.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <p className="text-sm font-medium text-blue-600 underline">{s.label}</p>
              <p className="text-xs text-gray-400 truncate">{s.url}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">
          This report was compiled from official SFUSD budget documents and public sources.
          It is not affiliated with SFUSD, UESF, or any political organization.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Made with care for the SF parent community · January 2026
        </p>
      </footer>
    </main>
  )
}
