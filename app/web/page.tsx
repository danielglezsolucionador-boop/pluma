'use client';

import { useState } from 'react';

export default function Web() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    tipo: '',
    nicho: '',
    tema: '',
    palabraClave: '',
    publico: '',
    tono: '',
  });

  const tipos = [
    { id: 'articulo', label: '📝 Artículo Blog', desc: 'SEO optimizado · Long form' },
    { id: 'newsletter', label: '📧 Newsletter', desc: 'Email marketing · Suscriptores' },
    { id: 'landingpage', label: '🚀 Landing Page', desc: 'Copy de ventas · Conversión' },
    { id: 'seo', label: '🔍 Contenido SEO', desc: 'Keywords · Posicionamiento' },
  ];

  const tonos = ['Informativo', 'Persuasivo', 'Conversacional', 'Técnico', 'Inspiracional'];
  const nichos = ['IA y Tecnología', 'Emprendimiento', 'Finanzas', 'Salud', 'Marketing', 'Educación', 'Legal', 'Otro'];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, padding: '32px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/dashboard" style={{
          padding: '8px 16px', borderRadius: '10px',
          background: 'rgba(108,63,245,0.08)', color: '#6C3FF5',
          fontSize: '14px', fontWeight: 600, textDecoration: 'none'
        }}>← Volver</a>
        <div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', color: '#1A1A2E' }}>
            🌐 Motor Web
          </h1>
          <p style={{ fontSize: '13px', color: '#718096' }}>Blog · SEO · Newsletter · Landing Pages</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['Tipo', 'Concepto', 'Generar'].map((p, i) => (
          <div key={i} style={{
            padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
            background: paso === i + 1 ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
            color: paso === i + 1 ? 'white' : '#6C3FF5',
          }}>{i + 1}. {p}</div>
        ))}
      </div>

      {paso === 1 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            ¿Qué tipo de contenido web necesitas?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
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

          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>Tono</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {tonos.map((t) => (
              <div key={t} onClick={() => setForm({ ...form, tono: t })}
                style={{
                  padding: '9px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                  background: form.tono === t ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                  color: form.tono === t ? 'white' : '#6C3FF5',
                }}>{t}</div>
            ))}
          </div>

          <button className="btn-ink"
            onClick={() => form.tipo && form.tono && setPaso(2)}
            style={{ padding: '14px 40px', fontSize: '16px', opacity: form.tipo && form.tono ? 1 : 0.5 }}>
            Continuar →
          </button>
        </div>
      )}

      {paso === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            Define el contenido
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Nicho</label>
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

            {[
              { key: 'tema', label: 'Tema o título', placeholder: 'Ej: Cómo usar IA para automatizar tu negocio en 2025' },
              { key: 'palabraClave', label: 'Palabra clave principal (SEO)', placeholder: 'Ej: automatización con IA, herramientas IA negocio' },
              { key: 'publico', label: 'Público objetivo', placeholder: 'Ej: Emprendedores latinoamericanos 25-45 años' },
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
              onClick={async () => { if (form.nicho && form.tema) { await import('@/lib/centinela').then(m => m.sendPromptToCentinela({ prompt: `Contenido web: ${form.tipo} | ${form.tono} | ${form.nicho} | ${form.tema} | ${form.palabraClave}`, agent: 'pluma', user: 'daniel', event_type: 'prompt.submitted', app_name: 'PLUMA' })); setPaso(3); } }}
              style={{ padding: '14px 40px', fontSize: '16px', opacity: form.nicho && form.tema ? 1 : 0.5 }}>
              Ver resumen →
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div>
          <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', borderTop: '3px solid #6C3FF5' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '20px', marginBottom: '20px', color: '#6C3FF5' }}>
              ✅ Resumen del contenido web
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Tipo', valor: form.tipo },
                { label: 'Tono', valor: form.tono },
                { label: 'Nicho', valor: form.nicho },
                { label: 'Público', valor: form.publico || 'No especificado' },
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
            {form.palabraClave && (
              <div style={{ marginTop: '12px', padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Palabra clave SEO</div>
                <div style={{ fontSize: '15px', color: '#1A1A2E' }}>{form.palabraClave}</div>
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
              Listo para generar tu contenido web
            </h3>
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
              PLUMA generará: artículo completo, meta descripción,<br/>
              estructura H1-H6, links internos sugeridos y score SEO.
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
              }}>← Nuevo contenido</button>
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