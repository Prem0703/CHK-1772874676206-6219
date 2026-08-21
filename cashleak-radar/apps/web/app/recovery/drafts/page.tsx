export default function RecoveryDraftsPage() {
  const draft = 'Hi ABC Traders, just a polite follow-up regarding invoice INV-001. An amount of ₹8,400 is currently outstanding. Could you please confirm the expected payment date?'
  return (
    <main style={{fontFamily:'system-ui',maxWidth:850,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Recovery Draft</h1>
      <p>AI-generated customer communication is always reviewable before sending.</p>
      <article style={{marginTop:28,padding:24,border:'1px solid #ddd',borderRadius:16,background:'#fff'}}>
        <strong>ABC Traders · INV-001 · ₹8,400</strong>
        <p style={{lineHeight:1.7}}>{draft}</p>
        <div style={{display:'flex',gap:10}}><button style={{padding:'10px 14px',borderRadius:9,border:0}}>Approve & Send</button><button style={{padding:'10px 14px',borderRadius:9}}>Edit</button></div>
      </article>
    </main>
  )
}
