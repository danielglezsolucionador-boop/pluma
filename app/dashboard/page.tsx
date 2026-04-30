'use client';

export default function Dashboard() {
  const motores = [
    { nombre: 'Motor Editorial', desc: 'Libros · KDP Amazon · Ficción', clase: 'motor-editorial', emoji: '📚', ruta: '/editorial' },
    { nombre: 'Motor Académico', desc: 'Tesis · Papers · Monografías', clase: 'motor-academico', emoji: '🎓', ruta: '/academico' },
    { nombre: 'Motor Guiones', desc: 'TikTok · YouTube · Podcasts', clase: 'motor-guiones', emoji: '🎬', ruta: '/guiones' },
    { nombre: 'Motor Social', desc: 'LinkedIn · X · Instagram', clase: 'motor-social', emoji: '📣', ruta: '/social' },
    { nombre: 'Motor Web', desc: 'Blog · SEO · Newsletter', clase: 'motor-web', emoji: '🌐', ruta: '/web' },
    { nombre: 'Motor Servicios', desc: 'Ghostwriting · Copywriting', clase: 'motor-servicios', emoji: '💼', ruta: '/servicios' },
  ];

  const stats = [
    { label: 'Contenidos creados', valor: '0', icono: '✍️' },
    { label: 'Publicados', valor: '0', icono: '🚀' },
    { label: 'En borrador', valor: '0', icono: '📝' },
    { label: 'Ingresos est.', valor: '$0', icono: '💰' },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, padding: '32px' }}>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '32px',
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.75)',
        borderRadius: '18px',
        padding: '20px 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #6C3FF5, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px'
          }}>🪶</div>
          <div>
            <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '24px', color: '#1A1A2E' }}>PLUMA</h1>
            <p style={{ fontSize: '13px', color: '#718096' }}>Editorial Inteligente · Daniel González</p>
          </div>
        </div>
        <div style={{ fontSize: '13px', color: '#718096' }}>
          {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icono}</div>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', color: '#1A1A2E' }}>{s.valor}</div>
            <div style={{ fontSize: '13px', color: '#718096', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '16px', color: '#1A1A2E' }}>
        Motores de Producción
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {motores.map((m, i) => (
          <a key={i} href={m.ruta} style={{ textDecoration: 'none' }}>
            <div className={`glass-card motor-card ${m.clase}`} style={{ padding: '24px', cursor: 'pointer' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{m.emoji}</div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '16px', color: '#1A1A2E', marginBottom: '6px' }}>
                {m.nombre}
              </h3>
              <p style={{ fontSize: '13px', color: '#718096' }}>{m.desc}</p>
              <div style={{
                marginTop: '16px', display: 'inline-block',
                padding: '6px 14px', borderRadius: '20px',
                background: 'rgba(108,63,245,0.08)',
                fontSize: '12px', fontWeight: 600, color: '#6C3FF5'
              }}>
                Abrir →
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '28px' }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px', color: '#1A1A2E' }}>
          ✍️ Últimos contenidos generados
        </h2>
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096', fontSize: '14px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🪶</div>
          <p>Aún no hay contenidos generados.</p>
          <p style={{ marginTop: '8px' }}>Selecciona un motor para empezar.</p>
        </div>
      </div>

    </div>
  );
}