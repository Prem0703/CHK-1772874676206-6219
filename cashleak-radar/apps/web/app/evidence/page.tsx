const evidence = [
  ['Order message', 'WhatsApp export', 'Matched customer + amount'],
  ['Invoice', 'INV-001', '₹18,400 outstanding'],
  ['Payment', 'UPI12345', '₹10,000 partial payment'],
]

export default function EvidencePage() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:950,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Evidence Timeline</h1>
      <p>Explainability is part of the product: every financial alert should be traceable to evidence.</p>
      <div style={{marginTop:28}}>{evidence.map(([type, source, finding], index) => <div key={type} style={{display:'grid',gridTemplateColumns:'160px 180px 1fr',gap:16,padding:20,borderLeft:'3px solid #171717',borderBottom:'1px solid #ddd',background:'#fff'}}><strong>{type}</strong><span>{source}</span><span>{finding}</span></div>)}</div>
    </main>
  )
}
