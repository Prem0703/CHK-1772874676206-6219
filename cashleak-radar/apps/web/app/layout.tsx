import type { ReactNode } from 'react'

export const metadata = {
  title: 'CashLeak Radar',
  description: 'AI-powered cash-recovery intelligence for small businesses.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
