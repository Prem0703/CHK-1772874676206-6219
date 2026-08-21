import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'CashLeak Radar',
  description: 'AI-powered cash-recovery intelligence for small businesses.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
