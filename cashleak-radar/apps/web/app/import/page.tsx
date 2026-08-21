export default function ImportPage() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:900,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Import your business evidence</h1>
      <p style={{fontSize:18,lineHeight:1.6}}>Start with CSV exports and document files. The MVP keeps financial mutations deterministic and uses AI only where unstructured evidence needs interpretation.</p>
      <div style={{display:'grid',gap:14,marginTop:28}}>
        {['Invoices CSV / PDF','Payments CSV','WhatsApp export (planned)'].map((item, i) => <div key={item} style={{padding:22,border:'1px solid #ddd',borderRadius:14,background:'#fff'}}><strong>{item}</strong><div style={{marginTop:8}}>{i < 2 ? 'Ready for MVP import' : 'Coming in integration phase'}</div></div>)}
      </div>
    </main>
  )
}
