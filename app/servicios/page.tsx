'use client';

import { useState } from 'react';

export default function Servicios() {
  const [servicio, setServicio] = useState('');
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    tipo: '',
    nicho: '',
    cliente: '',
    objetivo: '',
    duracion: '',
    entregables: '',
  });

  const servicios = [
    { id: 'ghostwriting', label: '✍️ Ghostwriting', desc: 'Escribe para clientes con su voz', color: '#6C3FF5' },
    { id: 'retainer', label: '🔁 Retainer Mensual', desc: 'Gestión completa de contenido', color: '#059669' },
    { id: 'plantillas', label: '🧩 Plantillas Digitales', desc: 'Crea y vende en Gumroad/Etsy', color: '#DC2626' },
  ];

  const nichos = ['IA y Tecnología', 'Emprendimiento', 'Finanzas', 'Marketing', 'Contabilidad', 'Legal', 'Salud', 'Otro'];
  const duraciones = ['1 mes', '3 meses', '6 meses', '12 meses'];

  const paquetesRetainer = [
    { nombre: 'Básico', precio: '$300/mes', incluye: ['8 posts LinkedIn', '4 artículos blog', 'Revisión incluida'] },
    { nombre: 'Estándar', precio: '$550/mes', incluye: ['16 posts LinkedIn', '8 artículos blog', '4 scripts video', 'Revisión incluida'] },
    { nombre: 'Premium', precio: '$1000/mes', incluye: ['30 posts LinkedIn', '12 artículos', '8 scripts', 'Newsletter semanal', 'Revisión prioritaria'] },
  ];

  const plantillasEjemplo = [
    { nombre: '30 posts para contadores', precio: '$27', plataforma: 'Gumroad' },
    { nombre: '50 ideas IA en negocios', precio: '$37', plataforma: 'Gumroad' },
    { nombre: 'Guía de prompts avanzados', precio: '$47', plataforma: 'Etsy' },
    { nombre: 'Pack contenido LinkedIn 90 días', precio: '$57', plataforma: 'Gumroad' },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10, padding: '32px', maxWidth: '960px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <a href="/dashboard" style={{
          padding: '8px 16px', borderRadius: '10px',
          background: 'rgba(108,63,245,0.08)', color: '#6C3FF5',
          fontSize: '14px', fontWeight: 600, textDecoration: 'none'
        }}>← Volver</a>
        <div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '28px', color: '#1A1A2E' }}>
            💼 Motor Servicios
          </h1>
          <p style={{ fontSize: '13px', color: '#718096' }}>Ghostwriting · Retainer · Plantillas Digitales</p>
        </div>
      </div>

      {/* Selector de servicio */}
      {!servicio && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            ¿Qué servicio quieres configurar?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {servicios.map((s) => (
              <div key={s.id} onClick={() => setServicio(s.id)}
                className="glass-card"
                style={{ padding: '28px', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{s.label.split(' ')[0]}</div>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '15px', color: '#1A1A2E', marginBottom: '8px' }}>
                  {s.label.split(' ').slice(1).join(' ')}
                </div>
                <div style={{ fontSize: '13px', color: '#718096' }}>{s.desc}</div>
                <div style={{
                  marginTop: '16px', padding: '8px 16px', borderRadius: '20px',
                  background: `rgba(108,63,245,0.08)`, color: '#6C3FF5',
                  fontSize: '12px', fontWeight: 600
                }}>Configurar →</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GHOSTWRITING */}
      {servicio === 'ghostwriting' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {['Cliente', 'Propuesta', 'Generar'].map((p, i) => (
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
                Define el perfil del cliente
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Nicho del cliente</label>
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
                  { key: 'cliente', label: 'Describe al cliente', placeholder: 'Ej: Contador peruano con 500 seguidores en LinkedIn, quiere posicionarse como experto en SUNAT' },
                  { key: 'objetivo', label: 'Objetivo del cliente', placeholder: 'Ej: Conseguir 5 clientes empresariales por mes' },
                ].map((field) => (
                  <div key={field.key}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>{field.label}</label>
                    <textarea value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder} rows={3}
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '10px',
                        border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                        fontSize: '14px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans', resize: 'vertical'
                      }} />
                  </div>
                ))}
              </div>
              <button className="btn-ink"
                onClick={() => form.nicho && form.cliente && setPaso(2)}
                style={{ padding: '14px 40px', fontSize: '16px', opacity: form.nicho && form.cliente ? 1 : 0.5 }}>
                Continuar →
              </button>
            </div>
          )}

          {paso === 2 && (
            <div>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
                Define la propuesta de servicio
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Duración del contrato</label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {duraciones.map((d) => (
                      <div key={d} onClick={() => setForm({ ...form, duracion: d })}
                        style={{
                          padding: '9px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '13px',
                          background: form.duracion === d ? 'linear-gradient(135deg, #6C3FF5, #8B5CF6)' : 'rgba(108,63,245,0.08)',
                          color: form.duracion === d ? 'white' : '#6C3FF5',
                        }}>{d}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: '#4A5568', display: 'block', marginBottom: '8px' }}>Entregables mensuales</label>
                  <textarea value={form.entregables}
                    onChange={(e) => setForm({ ...form, entregables: e.target.value })}
                    placeholder="Ej: 12 posts LinkedIn, 4 artículos blog, 2 newsletters" rows={3}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '10px',
                      border: '1px solid rgba(108,63,245,0.2)', background: 'rgba(255,255,255,0.8)',
                      fontSize: '14px', color: '#1A1A2E', outline: 'none', fontFamily: 'Plus Jakarta Sans', resize: 'vertical'
                    }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setPaso(1)} style={{
                  padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
                  background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer'
                }}>← Atrás</button>
                <button className="btn-ink"
                  onClick={() => form.duracion && form.entregables && setPaso(3)}
                  style={{ padding: '14px 40px', fontSize: '16px', opacity: form.duracion && form.entregables ? 1 : 0.5 }}>
                  Ver propuesta →
                </button>
              </div>
            </div>
          )}

          {paso === 3 && (
            <div className="glass-card" style={{ padding: '32px', borderTop: '3px solid #6C3FF5' }}>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '20px', marginBottom: '20px', color: '#6C3FF5' }}>
                ✅ Propuesta de Ghostwriting lista
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'Nicho', valor: form.nicho },
                  { label: 'Duración', valor: form.duracion },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)' }}>
                    <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A2E' }}>{item.valor}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)', marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Cliente</div>
                <div style={{ fontSize: '14px', color: '#1A1A2E' }}>{form.cliente}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(108,63,245,0.06)', marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '4px' }}>Entregables</div>
                <div style={{ fontSize: '14px', color: '#1A1A2E' }}>{form.entregables}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', marginBottom: '20px', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', fontSize: '14px', color: '#A87800' }}>
                ⏳ Con API activa: PLUMA genera la propuesta completa en PDF + email de cierre
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => { setPaso(1); setServicio(''); }} style={{
                  padding: '14px 32px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
                  background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer'
                }}>← Volver</button>
                <button className="btn-ink" style={{ padding: '14px 40px', fontSize: '16px' }}>
                  💾 Guardar propuesta
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RETAINER */}
      {servicio === 'retainer' && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            🔁 Paquetes Retainer — Elige tu oferta
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            {paquetesRetainer.map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '24px', textAlign: 'center', borderTop: i === 1 ? '3px solid #6C3FF5' : '1px solid rgba(255,255,255,0.75)' }}>
                {i === 1 && <div style={{ fontSize: '11px', fontWeight: 700, color: '#6C3FF5', letterSpacing: '1px', marginBottom: '8px' }}>⭐ RECOMENDADO</div>}
                <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '20px', color: '#1A1A2E', marginBottom: '4px' }}>{p.nombre}</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#6C3FF5', marginBottom: '16px' }}>{p.precio}</div>
                {p.incluye.map((item, j) => (
                  <div key={j} style={{ fontSize: '13px', color: '#718096', padding: '6px 0', borderBottom: j < p.incluye.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                    ✓ {item}
                  </div>
                ))}
                <button className="btn-ink" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '13px' }}>
                  Usar este paquete
                </button>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', fontSize: '14px', color: '#A87800', marginBottom: '20px' }}>
            ⏳ Con API activa: PLUMA genera todo el contenido del mes automáticamente
          </div>
          <button onClick={() => setServicio('')} style={{
            padding: '12px 28px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
            background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer'
          }}>← Volver</button>
        </div>
      )}

      {/* PLANTILLAS */}
      {servicio === 'plantillas' && (
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>
            🧩 Plantillas Digitales — Ideas listas para vender
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            {plantillasEjemplo.map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '14px', color: '#1A1A2E', marginBottom: '4px' }}>{p.nombre}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>Vender en {p.plataforma}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#6C3FF5' }}>{p.precio}</div>
                  <button className="btn-ink" style={{ marginTop: '8px', padding: '6px 14px', fontSize: '12px' }}>
                    Crear
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.3)', fontSize: '14px', color: '#A87800', marginBottom: '20px' }}>
            ⏳ Con API activa: PLUMA genera la plantilla completa lista para subir a Gumroad/Etsy
          </div>
          <button onClick={() => setServicio('')} style={{
            padding: '12px 28px', borderRadius: '12px', border: '1px solid rgba(108,63,245,0.3)',
            background: 'transparent', color: '#6C3FF5', fontWeight: 600, cursor: 'pointer'
          }}>← Volver</button>
        </div>
      )}
    </div>
  );
}