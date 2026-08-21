const anomalies = [
  { label: 'Delivered but not invoiced', amount: '₹18,400', severity: 'High' },
  { label: 'Unmatched payment', amount: '₹3,200', severity: 'High' },
  { label: 'Partial payment', amount: '₹2,500', severity: 'Medium' },
]

export default function Dashboard() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:1200,margin:'0 auto',padding:'40px 24px'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,marginBottom:32}}>
        <div><p style={{fontWeight:700}}>CASHLEAK RADAR</p><h1 style={{margin:0}}>Cash Risk Dashboard</h1></div>
        <button style={{padding:'12px 18px',borderRadius:10,border:0}}>Import Data</button>
      </header>
      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:16}}>
        {[
          ['₹1,31,900','Potentially recoverable'],
          ['₹72,500','High risk'],
          ['₹31,200','Unmatched payments'],
          ['₹18,400','Missing invoices'],
        ].map(([value,label]) => <article key={label} style={{padding:22,border:'1px solid #ddd',borderRadius:16,background:'#fff'}}><div style={{fontSize:30,fontWeight:750}}>{value}</div><div style={{marginTop:6}}>{label}</div></article>)}
      </section>
      <section style={{marginTop:28,padding:24,border:'1px solid #ddd',borderRadius:16,background:'#fff'}}>
        <h2>Priority anomalies</h2>
        {anomalies.map(a => <div key={a.label} style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:20,padding:'16px 0',borderTop:'1px solid #eee'}}><span>{a.label}</span><strong>{a.amount}</strong><span>{a.severity}</span></div>)}
      </section>
    </main>
  )
}
