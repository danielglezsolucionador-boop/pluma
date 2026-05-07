'use client';

import { useState } from 'react';

export default function Academico() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    tipo: '',
    nivel: '',
    area: '',
    tema: '',
    institucion: '',
    extensión: '',
  });

  const tipos = [
    { id: 'tesis', label: '🎓 Tesis', desc: 'Licenciatura · Maestría · Doctorado' },
    { id: 'paper', label: '📄 Paper / Artículo', desc: 'Revistas científicas · Conferencias' },
    { id: 'monografia', label: '📋 Monografía', desc: 'Investigación temática completa' },
    { id: 'resumen', label: '⚡ Resumen ejecutivo', desc: 'Síntesis académica profesional' },
  ];

  const areas = [
    'Administración', 'Derecho', 'Medicina', 'Ingeniería',
    'Psicología', 'Educación', 'Economía', 'Tecnología', 'Ciencias Sociales', 'Otra'
  ];

  const niveles = ['Pregrado', 'Maestría', 'Doctorado', 'Profesional'];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, padding: '32px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/dashboard" style={{
          padding: '8px 16px', borderRadius: '10px',
          background: 'rgba(108,63,245,0.08)', color: '#6C3FF5',
          fontSize: '14px', fontWeight: 600, textDecoration: 'none'
        }}>← Volver</a>
        <div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', color: '#1A1A2E' }}>
            🎓 Motor Académico
          </h1>
          <p style={{ fontSize: '13px', color: '#718096' }}>Tesis · Papers · Monografías · Resúmenes</p>
        </div>
      </div>

      {/* Pasos */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['Tipo', 'Detalle', 'Generar'].map((p, i) => (
          <div key={i} style={{
            padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
            background: paso === i + 1 ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
            color: paso === i + 1 ? 'white' : '#6C3FF5',
          }}>{i + 1}. {p}</div>
        ))}
      </div>

      {/* Paso 1 */}
      {paso === 1 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            ¿Qué tipo de documento académico necesitas?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            {tipos.map((t) => (
              <div key={t.id} onClick={() => setForm({ ...form, tipo: t.id })}
                className="glass-card"
                style={{
                  padding: '24px', cursor: 'pointer',
                  border: form.tipo === t.id ? '2px solid #6C3FF5' : '1px solid rgba(255,255,255,0.75)',
                  background: form.tipo === t.id ? 'rgba(108,63,245,0.06)' : 'rgba(255,255,255,0.82)',
                }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.label.split(' ')[0]}</div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '15px', color: '#1A1A2E' }}>
                  {t.label.split(' ').slice(1).join(' ')}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', marginTop: '4px' }}>{t.desc}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>
            Nivel académico
          </h2>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {niveles.map((n) => (
              <div key={n} onClick={() => setForm({ ...form, nivel: n })}
                style={{
                  padding: '10px 24px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
                  background: form.nivel === n ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                  color: form.nivel === n ? 'white' : '#6C3FF5',
                }}>{n}</div>
            ))}
          </div>

          <button className="btn-ink"
            onClick={() => form.tipo && form.nivel && setPaso(2)}
            style={{ padding: '14px 40px', fontSize: '16px', opacity: form.tipo && form.nivel ? 1 : 0.5 }}>
            Continuar →
          </button>
        </div>
      )}

      {/* Paso 2 */}
      {paso === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            Detalla tu investigación
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>
                Área de conocimiento
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {areas.map((a) => (
                  <span key={a} onClick={() => setForm({ ...form, area: a })}
                    style={{
                      padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      background: form.area === a ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                      color: form.area === a ? 'white' : '#6C3FF5',
                    }}>{a}</span>
                ))}
              </div>
            </div>

            {[
              { key: 'tema', label: 'Tema o título tentativo', placeholder: 'Ej: Impacto de la IA en la educación superior latinoamericana' },
              { key: 'institucion', label: 'Institución (opcional)', placeholder: 'Ej: Universidad Nacional de Cusco' },
              { key: 'extensión', label: 'Extensión aproximada', placeholder: 'Ej: 80 páginas, 5000 palabras...' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>
                  {field.label}
                </label>
                <input value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '10px',
                    border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                    fontSize: '15px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans'
                  }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setPaso(1)} style={{
              padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
              background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer', fontSize: '15px'
            }}>← Atrás</button>
            <button className="btn-ink"
              onClick={async () => { if (form.area && form.tema) { await import('@/lib/centinela').then(m => m.sendPromptToCentinela({ prompt: `Documento académico: ${form.tipo} | ${form.nivel} | ${form.area} | ${form.tema}`, agent: 'pluma', user: 'daniel', event_type: 'prompt.submitted', app_name: 'PLUMA' })); setPaso(3); } }}
              style={{ padding: '14px 40px', fontSize: '16px', opacity: form.area && form.tema ? 1 : 0.5 }}>
              Ver resumen →
            </button>
          </div>
        </div>
      )}

      {/* Paso 3 */}
      {paso === 3 && (
        <div>
          <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', borderTop: '3px solid #6C3FF5' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '20px', marginBottom: '20px', color: '#6C3FF5' }}>
              ✅ Resumen del documento
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Tipo', valor: form.tipo },
                { label: 'Nivel', valor: form.nivel },
                { label: 'Área', valor: form.area },
                { label: 'Extensión', valor: form.extensión || 'No especificada' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
                  <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A2E', textTransform: 'capitalize' }}>{item.valor}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px', padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Tema</div>
              <div style={{ fontSize: '15px', color: '#1A1A2E' }}>{form.tema}</div>
            </div>
            {form.institucion && (
              <div style={{ marginTop: '12px', padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Institución</div>
                <div style={{ fontSize: '15px', color: '#1A1A2E' }}>{form.institucion}</div>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
              Listo para generar tu documento académico
            </h3>
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
              PLUMA generará: estructura completa, marco teórico, metodología,<br/>
              referencias APA/MLA y contenido sección por sección.
            </p>
            <div style={{
              padding: '16px 24px', borderRadius: '12px', marginBottom: '24px',
              background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)',
              fontSize: '14px', color: '#A87800'
            }}>
              ⏳ Esperando API key de Anthropic — $5 activa este motor completamente
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setPaso(1)} style={{
                padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
                background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer'
              }}>← Nuevo documento</button>
              <button className="btn-ink" style={{ padding: '14px 40px', fontSize: '16px' }}>
                💾 Guardar concepto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}