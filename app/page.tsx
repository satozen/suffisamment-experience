// Page d'accueil de Suffisamment - Landing page avec présentation du concept et animation du bouton principal
'use client'
import Link from 'next/link'
import Image from 'next/image'
import './home.css'
import { useState, useEffect } from 'react'

export default function Home() {
  const names = ['papa', 'maman', 'grand-maman', 'grand-papa', 'mon amour', 'mon ami']
  const [currentNameIndex, setCurrentNameIndex] = useState(0)
  const [isTextVisible, setIsTextVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length)
    }, 2000) // Change toutes les 2 secondes

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Déclencher l'animation de texte au chargement
    const timer = setTimeout(() => {
      setIsTextVisible(true)
    }, 300)

    return () => clearTimeout(timer)
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
          <h1 className={`home-title ${isTextVisible ? 'text-reveal' : ''}`}>
            Si un être cher parti pouvait te parler, que dirait-il?
          </h1>
          <p className={`home-description ${isTextVisible ? 'text-reveal-delayed' : ''}`}>
            Imagine les mots qu'il voudrait te dire... Des mots de réconfort, d'amour et de paix. Je transforme ces messages en une œuvre d'art personnalisée qui guérit. Paquet mouchoirs inclus dans chaque colis.
          </p>
          <div className="home-buttons">
            <Link href="/questionnaire" className="btn-primary">
              Je veux t'entendre <span className="name-container">
                <span className="name-placeholder" aria-hidden="true">grand-maman</span>
                <span className="animated-name" key={currentNameIndex}>{names[currentNameIndex]}</span>
              </span>
            </Link>
            <Link href="/concept" className="btn-secondary">
              DÉCOUVRIR LE CONCEPT
            </Link>
          </div>
        </div>
      </div>
      <div className="home-right">
        <div className="hero-text-background">
          Mon cher enfant, si je pouvais te parler aujourd'hui, je te dirais que tu as été aimé au-delà des mots. Chaque rire que nous avons partagé, chaque moment précieux reste gravé dans l'éternité. Ne pleure pas trop longtemps, vis pleinement, aime profondément, et sache que je suis toujours là, dans ton cœur...
        </div>
        <div className="home-hero-image">
          <Image 
            src="/hero-image.jpg" 
            alt="Cadre photo avec illustration de mère et enfant - Suffisamment"
            width={796}
            height={830}
            priority
            className="hero-image"
          />
        </div>
      </div>
    </div>
  )
}
