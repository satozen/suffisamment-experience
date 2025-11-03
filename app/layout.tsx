// Layout principal de l'application Suffisamment - génération de textes personnalisés pour accompagner le deuil
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Suffisamment - L\'art qui fait du bien au quotidien',
  description: 'Le cadeau qui émeut aux larmes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
