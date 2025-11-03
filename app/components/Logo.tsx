// Composant Logo pour Suffisamment - affiche le logo image avec le texte "SUFFISAMMENT" et "l'expérience"
import Image from 'next/image'
import './Logo.css'

export default function Logo() {
  return (
    <div className="logo-container">
      <Image 
        src="/logo.png" 
        alt="Suffisamment Logo" 
        width={120}
        height={120}
        priority
        className="logo-image"
      />
      <div className="logo-text-wrapper">
        <div className="logo-suffisamment">SUFFISAMMENT</div>
        <div className="logo-aimé">l'expérience</div>
      </div>
    </div>
  )
}
