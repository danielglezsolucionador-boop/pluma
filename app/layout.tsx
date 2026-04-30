import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PLUMA — Editorial Inteligente',
  description: 'Sistema de creación de contenido con IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="dot-grid" />
        {children}
      </body>
    </html>
  );
}