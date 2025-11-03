// Page de résultat affichant le texte généré avec possibilité de régénération
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import './resultat.css'

interface TextData {
  textId: string
  text: string
  formData?: any
}

export default function ResultatPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [textData, setTextData] = useState<TextData | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // En production, tu récupérerais le texte depuis une base de données
    // Pour l'instant, on peut stocker temporairement dans sessionStorage
    if (typeof window !== 'undefined') {
      const textId = searchParams.get('textId')
      const storedData = sessionStorage.getItem('generatedText')
      if (storedData) {
        const data = JSON.parse(storedData)
        // Vérifier que l'ID correspond
        if (!textId || data.textId === textId) {
          setTextData(data)
        }
      }
    }
  }, [searchParams])

  const handleRegenerate = async () => {
    if (!textData?.formData) {
      setError('Impossible de régénérer sans les données du formulaire')
      return
    }

    setIsRegenerating(true)
    setError('')

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(textData.formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la régénération')
      }

      const data = await response.json()
      const newTextData = { ...data, formData: textData.formData }
      setTextData(newTextData)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('generatedText', JSON.stringify(newTextData))
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsRegenerating(false)
    }
  }

  if (!textData) {
    return (
      <div className="resultat-container">
        <div className="resultat-content">
          <p>Chargement du texte...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="resultat-container">
      <div className="resultat-content">
        <h1>Ton texte personnalisé</h1>
        <p className="resultat-intro">
          Voici le texte qui a été créé spécialement pour toi. Il sera envoyé par la poste dans un paquet soigné, accompagné d'un paquet de mouchoirs.
        </p>

        <div className="text-display">
          <div className="text-content">
            {textData.text.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>{paragraph.trim()}</p>
              )
            ))}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="resultat-actions">
          <button
            onClick={handleRegenerate}
            className="btn-secondary"
            disabled={isRegenerating}
          >
            {isRegenerating ? 'Régénération...' : 'Régénérer le texte'}
          </button>
          <Link href="/unboxing" className="btn-primary">
            Découvrir le kit d'unboxing
          </Link>
        </div>

        <div className="resultat-info">
          <p>
            <strong>Envoi par la poste:</strong> Ton texte sera imprimé avec soin et envoyé par la poste dans les prochains jours.
          </p>
        </div>
      </div>
    </div>
  )
}
