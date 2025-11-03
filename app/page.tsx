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
          <div className="scroll-line scroll-left size-medium">
            Il n'y a pas de mots magiques pour effacer la douleur. Pour revenir en arrière. Mais il y a des mots pour réconforter. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Il n'y a pas de mots magiques pour effacer la douleur. Pour revenir en arrière. Mais il y a des mots pour réconforter. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Il n'y a pas de mots magiques pour effacer la douleur. Pour revenir en arrière. Mais il y a des mots pour réconforter.
          </div>
          <div className="scroll-line scroll-right size-small">
            Je vois cette peur qui t'habite. Cette épreuve qui a tout chamboulé. Tu n'as pas à être forte tous les jours. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je vois cette peur qui t'habite. Cette épreuve qui a tout chamboulé. Tu n'as pas à être forte tous les jours. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je vois cette peur qui t'habite. Cette épreuve qui a tout chamboulé. Tu n'as pas à être forte tous les jours.
          </div>
          <div className="scroll-line scroll-left size-large">
            Je sais que certains jours, juste respirer te demande déjà beaucoup. Que les nuits sont remplies de questions. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je sais que certains jours, juste respirer te demande déjà beaucoup. Que les nuits sont remplies de questions. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je sais que certains jours, juste respirer te demande déjà beaucoup. Que les nuits sont remplies de questions.
          </div>
          <div className="scroll-line scroll-right size-medium">
            Tu n'as pas à sourire quand tu as envie de pleurer. Tu as le droit d'être fâchée. Tu as le droit d'avoir peur. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tu n'as pas à sourire quand tu as envie de pleurer. Tu as le droit d'être fâchée. Tu as le droit d'avoir peur. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tu n'as pas à sourire quand tu as envie de pleurer. Tu as le droit d'être fâchée. Tu as le droit d'avoir peur.
          </div>
          <div className="scroll-line scroll-left size-small">
            Je ne te dirai pas ces phrases vides. Ce que je te dirai, c'est que je suis là. Pour tenir ta main dans les moments sombres. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je ne te dirai pas ces phrases vides. Ce que je te dirai, c'est que je suis là. Pour tenir ta main dans les moments sombres. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Je ne te dirai pas ces phrases vides. Ce que je te dirai, c'est que je suis là. Pour tenir ta main dans les moments sombres.
          </div>
          <div className="scroll-line scroll-right size-large">
            Ces moments de grâce surgissent parfois, inattendus, au cœur même de l'épreuve. Un instant de paix volé au chaos. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ces moments de grâce surgissent parfois, inattendus, au cœur même de l'épreuve. Un instant de paix volé au chaos. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ces moments de grâce surgissent parfois, inattendus, au cœur même de l'épreuve. Un instant de paix volé au chaos.
          </div>
          <div className="scroll-line scroll-left size-medium">
            Tu es SUFFISAMMENT. Résiliente pour traverser cette épreuve. Tu n'as pas besoin d'être une guerrière. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tu es SUFFISAMMENT. Résiliente pour traverser cette épreuve. Tu n'as pas besoin d'être une guerrière. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tu es SUFFISAMMENT. Résiliente pour traverser cette épreuve. Tu n'as pas besoin d'être une guerrière.
          </div>
          <div className="scroll-line scroll-right size-small">
            Prends soin de toi. Célèbre les petites victoires. Je crois en toi. Tu restes toi, précieuse et profondément aimée. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Prends soin de toi. Célèbre les petites victoires. Je crois en toi. Tu restes toi, précieuse et profondément aimée. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Prends soin de toi. Célèbre les petites victoires. Je crois en toi. Tu restes toi, précieuse et profondément aimée.
          </div>
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
