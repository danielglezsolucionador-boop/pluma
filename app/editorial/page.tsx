'use client';

import { useState } from 'react';

export default function Editorial() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    tipo: '',
    idioma: '',
    nicho: '',
    publico: '',
    tema: '',
    diferenciador: '',
  });

  const tipos = [
    { id: 'infantil', label: '📚 Libro infantil', desc: 'Historias para niños 3-10 años' },
    { id: 'actividades', label: '✏️ Activity book', desc: 'Laberintos, colorear, puntos' },
    { id: 'noficcion', label: '💡 No ficción', desc: 'Guías, manuales, how-to' },
    { id: 'ficcion', label: '🌙 Ficción', desc: 'Novela, cuentos, relatos' },
  ];

  const nichos = [
    'Inteligencia Artificial', 'Emprendimiento', 'Educación financiera',
    'Mindfulness', 'Crianza', 'Tecnología', 'Motivación', 'Otro'
  ];

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
            📚 Motor Editorial
          </h1>
          <p style={{ fontSize: '13px', color: '#718096' }}>Crea libros para Amazon KDP · Inglés y Español</p>
        </div>
      </div>

      {/* Pasos */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['Tipo', 'Concepto', 'Generar'].map((p, i) => (
          <div key={i} style={{
            padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
            background: paso === i + 1 ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
            color: paso === i + 1 ? 'white' : '#6C3FF5',
          }}>{i + 1}. {p}</div>
        ))}
      </div>

      {/* Paso 1 — Tipo de libro */}
      {paso === 1 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            ¿Qué tipo de libro quieres crear?
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
            ¿En qué idioma?
          </h2>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {['Inglés', 'Español', 'Ambos'].map((lang) => (
              <div key={lang} onClick={() => setForm({ ...form, idioma: lang })}
                style={{
                  padding: '10px 24px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
                  background: form.idioma === lang ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                  color: form.idioma === lang ? 'white' : '#6C3FF5',
                }}>{lang}</div>
            ))}
          </div>

          <button className="btn-ink"
            onClick={() => form.tipo && form.idioma && setPaso(2)}
            style={{ padding: '14px 40px', fontSize: '16px', opacity: form.tipo && form.idioma ? 1 : 0.5 }}>
            Continuar →
          </button>
        </div>
      )}

      {/* Paso 2 — Concepto */}
      {paso === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            Define el concepto del libro
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>
                Nicho / Categoría
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {nichos.map((n) => (
                  <span key={n} onClick={() => setForm({ ...form, nicho: n })}
                    style={{
                      padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      background: form.nicho === n ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                      color: form.nicho === n ? 'white' : '#6C3FF5',
                    }}>{n}</span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>
                Público objetivo
              </label>
              <input value={form.publico} onChange={(e) => setForm({ ...form, publico: e.target.value })}
                placeholder="Ej: Niños de 4-7 años, Emprendedores latinoamericanos..."
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                  fontSize: '15px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans'
                }} />
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>
                Tema central del libro
              </label>
              <input value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })}
                placeholder="Ej: Un robot que enseña sobre emociones a los niños..."
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                  fontSize: '15px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans'
                }} />
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>
                ¿Qué lo hace diferente a los demás?
              </label>
              <input value={form.diferenciador} onChange={(e) => setForm({ ...form, diferenciador: e.target.value })}
                placeholder="Ej: Combina IA con valores culturales latinos..."
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                  fontSize: '15px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans'
                }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setPaso(1)} style={{
              padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
              background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer', fontSize: '15px'
            }}>← Atrás</button>
            <button className="btn-ink"
              onClick={async () => { if (form.nicho && form.tema) { await import('@/lib/centinela').then(m => m.sendPromptToCentinela({ prompt: `Generar libro: ${form.tipo} | ${form.nicho} | ${form.tema} | ${form.diferenciador}`, agent: 'pluma', user: 'daniel' })); setPaso(3); } }}
              style={{ padding: '14px 40px', fontSize: '16px', opacity: form.nicho && form.tema ? 1 : 0.5 }}>
              Generar concepto →
            </button>
          </div>
        </div>
      )}

      {/* Paso 3 — Generar */}
      {paso === 3 && (
        <div>
          <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', borderTop: '3px solid #6C3FF5' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '20px', marginBottom: '20px', color: '#6C3FF5' }}>
              ✅ Concepto del libro
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Tipo', valor: form.tipo },
                { label: 'Idioma', valor: form.idioma },
                { label: 'Nicho', valor: form.nicho },
                { label: 'Público', valor: form.publico },
              ].map((item, i) => (
                <div key={i} style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
                  <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A2E', textTransform: 'capitalize' }}>{item.valor}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px', padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Tema central</div>
              <div style={{ fontSize: '15px', color: '#1A1A2E' }}>{form.tema}</div>
            </div>
            <div style={{ marginTop: '12px', padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Diferenciador</div>
              <div style={{ fontSize: '15px', color: '#1A1A2E' }}>{form.diferenciador}</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
              Listo para generar el libro completo
            </h3>
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
              Cuando conectes la API de Anthropic, PLUMA generará el guión completo,<br/>
              estructura por capítulos, títulos optimizados para KDP y keywords SEO.
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
              }}>← Nuevo libro</button>
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