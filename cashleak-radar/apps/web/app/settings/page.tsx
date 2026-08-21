export default function SettingsPage() {
  return (
    <main style={{fontFamily:'system-ui',maxWidth:850,margin:'0 auto',padding:'64px 24px'}}>
      <p style={{fontWeight:700}}>CASHLEAK RADAR</p>
      <h1>Workspace Settings</h1>
      <div style={{marginTop:24,display:'grid',gap:14}}>
        {['Organization profile','Team roles & permissions','AI provider settings','Data retention','Audit logs'].map(item => <div key={item} style={{padding:20,border:'1px solid #ddd',borderRadius:14,background:'#fff'}}><strong>{item}</strong><p style={{marginBottom:0}}>Configure {item.toLowerCase()}.</p></div>)}
      </div>
    </main>
  )
}
