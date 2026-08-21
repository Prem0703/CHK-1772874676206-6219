'use client'

export default function Error({ reset }: { reset: () => void }) {
  return <main style={{fontFamily:'system-ui',padding:64}}><h1>Something went wrong</h1><p>CashLeak Radar could not load this view.</p><button onClick={() => reset()} style={{padding:'10px 14px',borderRadius:9,border:0}}>Try again</button></main>
}
