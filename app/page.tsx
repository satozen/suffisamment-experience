// Page d'accueil de Suffisamment - Landing page avec présentation du concept et animation du bouton principal
'use client'
import Link from 'next/link'
import Image from 'next/image'
import './home.css'
import { useState, useEffect } from 'react'

export default function Home() {
  const names = ['papa', 'maman', 'grand-maman', 'grand-papa', 'mon amour', 'mon ami']
  const [currentNameIndex, setCurrentNameIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length)
    }, 2000) // Change toutes les 2 secondes

    return () => clearInterval(interval)
  }, [])
  return (
    <div className="home-container">
      <div className="home-left">
        <div className="home-content">
          <div className="home-logo">
            <Image 
              src="/logo.png" 
              alt="Suffisamment Logo" 
              width={120}
              height={120}
              priority
              className="logo-image-white"
            />
            <div className="logo-text-wrapper">
              <div className="logo-suffisamment">SUFFISAMMENT</div>
              <div className="logo-aimé">Aimé</div>
            </div>
          </div>
          <p className="home-subtitle">SUFFISAMMENT - L'ART QUI FAIT DU BIEN AU QUOTIDIEN</p>
          <h1 className="home-title">Si un être cher parti pouvait te parler, que dirait-il?</h1>
          <p className="home-description">
            Imagine les mots qu'il voudrait te dire... Des mots de réconfort, d'amour et de paix. Je transforme ces messages en une œuvre d'art personnalisée qui guérit. Paquet mouchoirs inclus dans chaque colis.
          </p>
          <div className="home-buttons">
            <Link href="/questionnaire" className="btn-primary">
              Je veux t'entendre <span className="animated-name" key={currentNameIndex}>{names[currentNameIndex]}</span>
            </Link>
            <Link href="/concept" className="btn-secondary">
              DÉCOUVRIR LE CONCEPT
            </Link>
          </div>
        </div>
      </div>
      <div className="home-right">
        <div className="home-artwork">
          <div className="artwork-frame">
            <div className="artwork-canvas">
              <div className="artwork-content">
                <div className="logo-text">
                  <div className="logo-suffisamment">SUFFISAMMENT</div>
                  <div className="logo-aimé">Aimé</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
