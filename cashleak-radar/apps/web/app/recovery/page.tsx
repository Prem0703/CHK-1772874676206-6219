const actions = [
  { customer: 'ABC Traders', invoice: 'INV-001', amount: '₹8,400', reason: 'Partial payment remains outstanding' },
  { customer: 'Unknown Customer', invoice: 'Unmatched', amount: '₹3,200', reason: 'Payment has no confident invoice match' },
]

export default function RecoveryPage() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:1000,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Recovery Center</h1>
      <p>Review AI recommendations before any customer-facing action is sent.</p>
      <div style={{display:'grid',gap:16,marginTop:28}}>
        {actions.map(a => <article key={a.customer + a.invoice} style={{padding:22,border:'1px solid #ddd',borderRadius:16,background:'#fff'}}><div style={{display:'flex',justifyContent:'space-between',gap:20}}><strong>{a.customer}</strong><strong>{a.amount}</strong></div><div style={{marginTop:8}}>{a.invoice} · {a.reason}</div><button style={{marginTop:16,padding:'10px 14px',borderRadius:9,border:0}}>Review draft</button></article>)}
      </div>
    </main>
  )
}
