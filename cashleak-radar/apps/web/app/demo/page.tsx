'use client'

import { useState } from 'react'

export default function DemoPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function runDemo() {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/demo/analyze')
      setResult(await response.json())
    } catch {
      setResult({ error: 'Start the API on localhost:8000 to run the live demo.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{fontFamily:'system-ui',maxWidth:1000,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Live Reconciliation Demo</h1>
      <p>Run the deterministic demo dataset through the reconciliation engine.</p>
      <button onClick={runDemo} disabled={loading} style={{marginTop:20,padding:'12px 18px',borderRadius:10,border:0}}>{loading ? 'Analyzing…' : 'Run Cash Leak Analysis'}</button>
      {result && <pre style={{marginTop:24,padding:20,borderRadius:14,background:'#171717',color:'#fff',overflow:'auto'}}>{JSON.stringify(result, null, 2)}</pre>}
    </main>
  )
}
