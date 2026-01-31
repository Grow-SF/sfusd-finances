import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Where Does the Money Go? — SFUSD Finances Explained',
  description: 'A parent-friendly breakdown of San Francisco Unified School District finances, 2020-2025.',
  openGraph: {
    title: 'Where Does the Money Go? — SFUSD Finances Explained',
    description: '5 years of SFUSD financial data, made clear for parents and community.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
