'use client';

import { useState } from 'react';

export default function Guiones() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    plataforma: '',
    formato: '',
    nicho: '',
    tema: '',
    duracion: '',
    tono: '',
  });

  const plataformas = [
    { id: 'tiktok', label: '🎵 TikTok', desc: 'Videos cortos 15-60 seg' },
    { id: 'youtube', label: '▶️ YouTube', desc: 'Videos largos 5-20 min' },
    { id: 'podcast', label: '🎙️ Podcast', desc: 'Audio 10-60 minutos' },
    { id: 'reels', label: '📱 Reels / Shorts', desc: 'Instagram · YouTube Shorts' },
  ];

  const tonos = ['Educativo', 'Entretenido', 'Inspiracional', 'Controversial', 'Tutorial', 'Historia'];
  const duraciones = ['15 segundos', '30 segundos', '60 segundos', '3-5 minutos', '10-15 minutos', '20+ minutos'];
  const nichos = ['IA y Tecnología', 'Emprendimiento', 'Finanzas', 'Motivación', 'Educación', 'Humor', 'Lifestyle', 'Otro'];

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
            🎬 Motor Guiones
          </h1>
          <p style={{ fontSize: '13px', color: '#718096' }}>TikTok · YouTube · Podcasts · Reels</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['Plataforma', 'Concepto', 'Generar'].map((p, i) => (
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
            ¿Para qué plataforma es el guión?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            {plataformas.map((p) => (
              <div key={p.id} onClick={() => setForm({ ...form, plataforma: p.id })}
                className="glass-card"
                style={{
                  padding: '24px', cursor: 'pointer',
                  border: form.plataforma === p.id ? '2px solid #6C3FF5' : '1px solid rgba(255,255,255,0.75)',
                  background: form.plataforma === p.id ? 'rgba(108,63,245,0.06)' : 'rgba(255,255,255,0.82)',
                }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{p.label.split(' ')[0]}</div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '15px', color: '#1A1A2E' }}>
                  {p.label.split(' ').slice(1).join(' ')}
                </div>
                <div style={{ fontSize: '13px', color: '#718096', marginTop: '4px' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>
            Duración
          </h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {duraciones.map((d) => (
              <div key={d} onClick={() => setForm({ ...form, duracion: d })}
                style={{
                  padding: '9px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                  background: form.duracion === d ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                  color: form.duracion === d ? 'white' : '#6C3FF5',
                }}>{d}</div>
            ))}
          </div>

          <button className="btn-ink"
            onClick={() => form.plataforma && form.duracion && setPaso(2)}
            style={{ padding: '14px 40px', fontSize: '16px', opacity: form.plataforma && form.duracion ? 1 : 0.5 }}>
            Continuar →
          </button>
        </div>
      )}

      {paso === 2 && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            Define el concepto del guión
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

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Tono del contenido</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tonos.map((t) => (
                  <span key={t} onClick={() => setForm({ ...form, tono: t })}
                    style={{
                      padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      background: form.tono === t ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                      color: form.tono === t ? 'white' : '#6C3FF5',
                    }}>{t}</span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Tema del video</label>
              <input value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })}
                placeholder="Ej: 5 formas de usar IA para ganar dinero desde casa..."
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
              onClick={async () => { if (form.nicho && form.tema && form.tono) { await import('@/lib/centinela').then(m => m.sendPromptToCentinela({ prompt: `Guión: ${form.plataforma} | ${form.duracion} | ${form.nicho} | ${form.tono} | ${form.tema}`, agent: 'pluma', user: 'daniel', event_type: 'prompt.submitted', app_name: 'PLUMA' })); setPaso(3); } }}
              style={{ padding: '14px 40px', fontSize: '16px', opacity: form.nicho && form.tema && form.tono ? 1 : 0.5 }}>
              Ver resumen →
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div>
          <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', borderTop: '3px solid #6C3FF5' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '20px', marginBottom: '20px', color: '#6C3FF5' }}>
              ✅ Resumen del guión
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Plataforma', valor: form.plataforma },
                { label: 'Duración', valor: form.duracion },
                { label: 'Nicho', valor: form.nicho },
                { label: 'Tono', valor: form.tono },
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
          </div>

          <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
              Listo para generar tu guión completo
            </h3>
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
              PLUMA generará: hook de apertura, desarrollo, CTA,<br/>
              subtítulos optimizados y hashtags para cada plataforma.
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
              }}>← Nuevo guión</button>
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