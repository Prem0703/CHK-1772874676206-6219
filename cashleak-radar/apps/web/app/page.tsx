export default function Home() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:1100,margin:'0 auto',padding:'64px 24px'}}>
      <section style={{padding:'48px 0'}}>
        <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
        <h1 style={{fontSize:'clamp(42px,7vw,76px)',lineHeight:1.02,margin:'16px 0'}}>Find the money your business forgot to collect.</h1>
        <p style={{fontSize:20,maxWidth:720,lineHeight:1.6}}>AI-powered cash-recovery intelligence that connects orders, invoices, payments and business conversations to uncover unresolved money.</p>
        <div style={{display:'flex',gap:12,marginTop:28}}>
          <button style={{padding:'14px 20px',borderRadius:10,border:0,cursor:'pointer'}}>Find Cash Leaks</button>
          <button style={{padding:'14px 20px',borderRadius:10,cursor:'pointer'}}>View Demo</button>
        </div>
      </section>
      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
        {[
          ['₹1,31,900','Potentially recoverable'],
          ['₹72,500','High-risk receivables'],
          ['₹31,200','Unmatched payments'],
          ['₹18,400','Delivered, not invoiced'],
        ].map(([value,label]) => <div key={label} style={{padding:24,border:'1px solid #ddd',borderRadius:16}}><strong style={{fontSize:28}}>{value}</strong><div style={{marginTop:8}}>{label}</div></div>)}
      </section>
      <section style={{marginTop:48,padding:28,border:'1px solid #ddd',borderRadius:16}}>
        <h2>How it works</h2>
        <ol style={{lineHeight:2}}>
          <li>Upload invoices, payment exports and conversation evidence.</li>
          <li>AI extracts and reconciles the transaction graph.</li>
          <li>CashLeak Radar flags missing, unmatched and risky money.</li>
          <li>Review evidence and approve the recommended recovery action.</li>
        </ol>
      </section>
    </main>
  )
}
