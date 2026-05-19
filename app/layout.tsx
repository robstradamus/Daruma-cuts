import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

// Estilos globales e iconos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Barberia | Daruma Cuts',
  description: 'Cortes de autor y estilo profesional en Río Grande. Agendá tu turno por WhatsApp.',
  icons: {
    icon: '/images/logoindx.png', // Este es el icono de la pestaña
    apple: '/images/logoindx.png', // Para cuando guardan la web en iPhone
  },
  openGraph: {
    title: 'Daruma Cuts | Barbería Premium',
    description: 'Estilo y precisión en cada corte.',
    images: ['/images/hero-barber.jpg'], // Imagen que sale al compartir el link por WhatsApp
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}