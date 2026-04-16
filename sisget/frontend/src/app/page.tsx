export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{ 
        height: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'radial-gradient(circle at center, rgba(194, 0, 0, 0.15) 0%, transparent 70%)',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>SISGET</h1>
        <p style={{ fontSize: '1.2rem', color: '#a1a1aa', maxWidth: '600px', marginBottom: '2rem' }}>
          Sistema de Gerenciamento de Tráfego - Excelência em Operações Satélite Norte.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-primary">Acessar Sistema</button>
          <button style={{ 
            background: 'transparent', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.1)', 
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}>Documentação</button>
        </div>
      </section>

      {/* Modules Grid */}
      <section style={{ 
        padding: '60px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%'
      }}>
        {[
          { title: 'Garagem', desc: 'Controle de reservas e abastecimento.', icon: '⛽' },
          { title: 'Frota', desc: 'Posicionamento e status da frota em tempo real.', icon: '🚌' },
          { title: 'Escala', desc: 'Gestão de fluxo e escalas operacionais.', icon: '📅' },
          { title: 'Pesquisa', desc: 'Consulta rápida de dados históricos.', icon: '🔍' }
        ].map((mod, i) => (
          <div key={i} className="glass" style={{ padding: '32px', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{mod.icon}</div>
            <h3 style={{ marginBottom: '12px' }}>{mod.title}</h3>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.5' }}>{mod.desc}</p>
          </div>
        ))}
      </section>

      <footer style={{ 
        marginTop: 'auto', 
        padding: '40px', 
        textAlign: 'center', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: '#52525b',
        fontSize: '0.9rem'
      }}>
        &copy; 2026 Grupo Satélite Norte. Todos os direitos reservados.
      </footer>
    </main>
  );
}
