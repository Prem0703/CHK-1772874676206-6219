const customers = [
  ['ABC Traders', '₹42,500', '18 days', 'High'],
  ['Sunrise Studio', '₹0', 'Paid', 'Low'],
  ['Metro Supplies', '₹12,500', '8 days', 'Medium'],
]

export default function CustomersPage() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:1050,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Customer Risk</h1>
      <p>Prioritize follow-up using transparent payment behaviour signals.</p>
      <div style={{marginTop:28,border:'1px solid #ddd',borderRadius:16,overflow:'hidden',background:'#fff'}}>
        {customers.map(([name, outstanding, delay, risk]) => <div key={name} style={{display:'grid',gridTemplateColumns:'1fr 150px 120px 90px',gap:12,padding:18,borderBottom:'1px solid #eee'}}><strong>{name}</strong><span>{outstanding}</span><span>{delay}</span><span>{risk}</span></div>)}
      </div>
    </main>
  )
}
