'use client'

export default function DashboardError({ reset }: { reset: () => void }) {
  return <main style={{fontFamily:'system-ui',padding:64}}><h1>Dashboard unavailable</h1><button onClick={reset} style={{padding:'10px 14px',borderRadius:9,border:0}}>Retry</button></main>
}
