'use client';
import { useState } from 'react';
import { sendPromptToCentinela } from '@/lib/centinela';

export default function Social() {
  const [paso, setPaso] = useState(1);
  const [sending, setSending] = useState(false);
  const [centinelaResult, setCentinelaResult] = useState<{ blocked: boolean; risk_score: number; action: string } | null>(null);
  const [form, setForm] = useState({
    red: '',
    tipo: '',
    nicho: '',
    tema: '',
    objetivo: '',
    tono: '',
  });

  const redes = [
    { id: 'linkedin',  label: 'LinkedIn',   desc: 'Posts profesionales · Articulos' },
    { id: 'twitter',   label: 'X / Twitter', desc: 'Threads · Tweets virales'       },
    { id: 'instagram', label: 'Instagram',   desc: 'Captions · Carruseles'           },
    { id: 'facebook',  label: 'Facebook',    desc: 'Posts · Grupos · Ads'            },
  ];

  const tipos     = ['Post unico', 'Carrusel / Thread', 'Historia / Story', 'Newsletter'];
  const objetivos = ['Conseguir clientes', 'Ganar seguidores', 'Generar debate', 'Educar', 'Vender producto', 'Posicionamiento'];
  const tonos     = ['Profesional', 'Cercano', 'Inspiracional', 'Directo', 'Humoristico', 'Controversial'];
  const nichos    = ['IA y Tecnologia', 'Emprendimiento', 'Finanzas', 'Marketing', 'Educacion', 'Liderazgo', 'Otro'];

  async function handleGenerar() {
    if (!form.nicho || !form.tema || !form.objetivo) return;
    setSending(true);
    try {
      const result = await sendPromptToCentinela({
        prompt: `Generar post social: ${form.red} | ${form.tipo} | ${form.nicho} | ${form.objetivo} | ${form.tono} | ${form.tema}`,
        agent: 'pluma',
        user: 'daniel',
        model: 'claude-sonnet',
      });
      setCentinelaResult(result);
    } catch(e) {}
    setSending(false);
    setPaso(3);
  }

  async function handleGuardar() {
    await sendPromptToCentinela({
      prompt: `Guardar concepto social: ${form.red} | ${form.nicho} | ${form.tema}`,
      agent: 'pluma',
      user: 'daniel',
      model: 'claude-sonnet',
    });
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, padding: '32px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/dashboard" style={{
          padding: '8px 16px', borderRadius: '10px',
          background: 'rgba(108,63,245,0.08)', color: '#6C3FF5',
          fontSize: '14px', fontWeight: 600, textDecoration: 'none',
        }}>← Volver</a>
        <div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', color: '#1A1A2E' }}>
            Motor Social
          </h1>
          <p style={{ fontSize: '13px', color: '#718096' }}>LinkedIn · X · Instagram · Facebook</p>
        </div>
        {centinelaResult && (
          <div style={{
            marginLeft: 'auto', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
            background: centinelaResult.blocked ? 'rgba(255,51,51,0.1)' : 'rgba(0,255,136,0.1)',
            color: centinelaResult.blocked ? '#FF3333' : '#00CC6A',
            border: `1px solid ${centinelaResult.blocked ? 'rgba(255,51,51,0.3)' : 'rgba(0,255,136,0.3)'}`,
          }}>
            CENTINELA: {centinelaResult.action} · Risk {centinelaResult.risk_score.toFixed(0)}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {['Red social', 'Concepto', 'Generar'].map((p, i) => (
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
            ¿En que red social vas a publicar?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            {redes.map((r) => (
              <div key={r.id} onClick={() => setForm({ ...form, red: r.id })}
                className="glass-card"
                style={{
                  padding: '24px', cursor: 'pointer',
                  border: form.red === r.id ? '2px solid #6C3FF5' : '1px solid rgba(255,255,255,0.75)',
                  background: form.red === r.id ? 'rgba(108,63,245,0.06)' : 'rgba(255,255,255,0.82)',
                }}>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '15px', color: '#1A1A2E' }}>{r.label}</div>
                <div style={{ fontSize: '13px', color: '#718096', marginTop: '4px' }}>{r.desc}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>
            Tipo de contenido
          </h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {tipos.map((t) => (
              <div key={t} onClick={() => setForm({ ...form, tipo: t })}
                style={{
                  padding: '9px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                  background: form.tipo === t ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                  color: form.tipo === t ? 'white' : '#6C3FF5',
                }}>{t}</div>
            ))}
          </div>

          <button className="btn-ink"
            onClick={() => form.red && form.tipo && setPaso(2)}
            style={{ padding: '14px 40px', fontSize: '16px', opacity: form.red && form.tipo ? 1 : 0.5 }}>
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

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Objetivo del post</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {objetivos.map((o) => (
                  <span key={o} onClick={() => setForm({ ...form, objetivo: o })}
                    style={{
                      padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      background: form.objetivo === o ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                      color: form.objetivo === o ? 'white' : '#6C3FF5',
                    }}>{o}</span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Tono</label>
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
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Tema del post</label>
              <input value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })}
                placeholder="Ej: Como use IA para triplicar mis ingresos en 30 dias..."
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                  fontSize: '15px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans',
                }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setPaso(1)} style={{
              padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
              background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer', fontSize: '15px',
            }}>← Atras</button>
            <button className="btn-ink"
              onClick={handleGenerar}
              disabled={sending || !form.nicho || !form.tema || !form.objetivo}
              style={{ padding: '14px 40px', fontSize: '16px', opacity: form.nicho && form.tema && form.objetivo ? 1 : 0.5 }}>
              {sending ? 'Analizando...' : 'Ver resumen →'}
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div>
          <div className="glass-card" style={{ padding: '32px', marginBottom: '24px', borderTop: '3px solid #6C3FF5' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '20px', marginBottom: '20px', color: '#6C3FF5' }}>
              Resumen del post
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Red social', valor: form.red      },
                { label: 'Tipo',       valor: form.tipo     },
                { label: 'Nicho',      valor: form.nicho    },
                { label: 'Objetivo',   valor: form.objetivo },
                { label: 'Tono',       valor: form.tono     },
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

            {centinelaResult && (
              <div style={{
                marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
                background: centinelaResult.blocked ? 'rgba(255,51,51,0.06)' : 'rgba(0,255,136,0.06)',
                border: `1px solid ${centinelaResult.blocked ? 'rgba(255,51,51,0.2)' : 'rgba(0,255,136,0.2)'}`,
                fontSize: '12px', fontFamily: 'monospace',
                color: centinelaResult.blocked ? '#FF3333' : '#00CC6A',
              }}>
                CENTINELA RUNTIME · Action: {centinelaResult.action} · Risk Score: {centinelaResult.risk_score.toFixed(1)} · {centinelaResult.blocked ? 'BLOQUEADO' : 'PERMITIDO'}
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>
              Listo para generar tu contenido social
            </h3>
            <p style={{ color: '#718096', fontSize: '14px', marginBottom: '24px' }}>
              PLUMA generara: copy completo, hashtags optimizados, CTA y variaciones para A/B testing.
            </p>
            <div style={{
              padding: '16px 24px', borderRadius: '12px', marginBottom: '24px',
              background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)',
              fontSize: '14px', color: '#A87800',
            }}>
              Esperando API key de Anthropic — $5 activa este motor completamente
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setPaso(1)} style={{
                padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
                background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer',
              }}>← Nuevo post</button>
              <button className="btn-ink" onClick={handleGuardar} style={{ padding: '14px 40px', fontSize: '16px' }}>
                Guardar concepto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}