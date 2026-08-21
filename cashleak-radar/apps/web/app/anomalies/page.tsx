const items = [
  ['Delivered but not invoiced', '₹18,400', '94%', 'High'],
  ['Unmatched payment', '₹3,200', '88%', 'High'],
  ['Partial payment', '₹2,500', '92%', 'Medium'],
]

export default function AnomaliesPage() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:1050,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Cash Leak Explorer</h1>
      <p>Every alert carries an evidence-based reason and confidence score.</p>
      <div style={{marginTop:28,border:'1px solid #ddd',borderRadius:16,overflow:'hidden',background:'#fff'}}>
        {items.map(([label, amount, confidence, severity]) => <div key={label} style={{display:'grid',gridTemplateColumns:'1fr 120px 100px 90px',gap:12,padding:18,borderBottom:'1px solid #eee'}}><span>{label}</span><strong>{amount}</strong><span>{confidence}</span><span>{severity}</span></div>)}
      </div>
    </main>
  )
}
