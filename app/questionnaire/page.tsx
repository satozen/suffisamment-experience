// Page de questionnaire pour générer un texte personnalisé d'accompagnement au deuil
// Collecte les réponses de l'utilisateur et les envoie à l'API Claude pour génération
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './questionnaire.css'

export default function QuestionnairePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    prenomNom: '',
    courriel: '',
    adressePostale: '',
    elementsAretirer: '',
    suffisammentHistoire: '',
    souvenirs: '',
    messageSouhaite: '',
    informationsPortrait: '',
    mediasSociaux: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const current = prev.mediasSociaux || []
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, mediasSociaux: updated }
    })
    setError('')
  }

  const handleTest = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, test: true }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du texte')
      }

      const data = await response.json()
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('generatedText', JSON.stringify(data))
      }
      router.push(`/resultat?textId=${data.textId}`)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Valider que au moins une option est sélectionnée pour les médias sociaux
    if (formData.mediasSociaux.length === 0) {
      setError('Veuillez sélectionner au moins une option pour les médias sociaux.')
      return
    }
    
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du texte')
      }

      const data = await response.json()
      // Stocker les données dans sessionStorage pour la page de résultat
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('generatedText', JSON.stringify(data))
      }
      router.push(`/resultat?textId=${data.textId}`)
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-content">
        <h1>Remplis le questionnaire</h1>
        <p className="questionnaire-intro">
          Pour créer un texte qui touche l'âme, j'ai besoin de comprendre ce que représente cette personne pour toi.
        </p>

        <form onSubmit={handleSubmit} className="questionnaire-form">
          <div className="form-group">
            <label htmlFor="prenomNom">
              1. Ton prénom et nom (Tel qu'inscrit lors de ta commande via mon site web)
            </label>
            <input
              type="text"
              id="prenomNom"
              value={formData.prenomNom}
              onChange={(e) => handleChange('prenomNom', e.target.value)}
              placeholder="Ton prénom et nom..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courriel">
              2. Courriel (le même qu'inscrit lors de ta commande)
            </label>
            <input
              type="email"
              id="courriel"
              value={formData.courriel}
              onChange={(e) => handleChange('courriel', e.target.value)}
              placeholder="ton@courriel.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adressePostale">
              3. Ton adresse postale
            </label>
            <input
              type="text"
              id="adressePostale"
              value={formData.adressePostale}
              onChange={(e) => handleChange('adressePostale', e.target.value)}
              placeholder="Ton adresse complète..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="elementsAretirer">
              4. Y a-t-il des éléments de la ou les photos partagées que tu souhaites retirer ?
            </label>
            <textarea
              id="elementsAretirer"
              value={formData.elementsAretirer}
              onChange={(e) => handleChange('elementsAretirer', e.target.value)}
              placeholder="Ex: je ne veux pas de tuque, retirer mes lunettes de soleil, enlever son toupette, etc."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="suffisammentHistoire">
              5. Écris-moi l'adjectif qualificatif de ton SUFFISAMMENT et les grandes lignes de ton histoire pour m'aider à rédiger le mot personnalisé
            </label>
            <p className="form-hint">
              Exemples: Suffisamment forte / Suffisamment maman / Suffisamment unique / Suffisamment présente, etc.
            </p>
            <textarea
              id="suffisammentHistoire"
              value={formData.suffisammentHistoire}
              onChange={(e) => handleChange('suffisammentHistoire', e.target.value)}
              placeholder="Ma mère est tout pour nous. Elle a toujours été présente pour ses boys..."
              rows={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="souvenirs">
              6. Quels sont les plus beaux souvenirs avec cette personne ou ces personnes? Avez-vous des traditions ensemble? Des passions partagées? Quels sont vos rêves, vos projets?
            </label>
            <input
              type="text"
              id="souvenirs"
              value={formData.souvenirs}
              onChange={(e) => handleChange('souvenirs', e.target.value)}
              placeholder="Tes plus beaux souvenirs..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="messageSouhaite">
              7. Qu'est-ce que tu souhaites lui dire plus que tout?
            </label>
            <input
              type="text"
              id="messageSouhaite"
              value={formData.messageSouhaite}
              onChange={(e) => handleChange('messageSouhaite', e.target.value)}
              placeholder="Ton message..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="informationsPortrait">
              8. Partage moi le nom des gens sur le portrait, le nom des gens qui offrent le portrait et d'autres informations utiles (son surnom, le nom de ses enfants, ses petits-enfants, son chien, etc). Tu peux me dire également de qui provient le cadeau.
            </label>
            <textarea
              id="informationsPortrait"
              value={formData.informationsPortrait}
              onChange={(e) => handleChange('informationsPortrait', e.target.value)}
              placeholder="Noms, relations, informations utiles..."
              rows={6}
              required
            />
          </div>

          <div className="form-group">
            <label>
              9. Que me permets-tu de partager sur les médias sociaux?
            </label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.mediasSociaux.includes('portrait')}
                  onChange={() => handleCheckboxChange('portrait')}
                />
                <span>Le portrait final</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.mediasSociaux.includes('photo')}
                  onChange={() => handleCheckboxChange('photo')}
                />
                <span>La photo originale</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.mediasSociaux.includes('message')}
                  onChange={() => handleCheckboxChange('message')}
                />
                <span>Le message émouvant</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.mediasSociaux.includes('aucun')}
                  onChange={() => handleCheckboxChange('aucun')}
                />
                <span>Aucun</span>
              </label>
            </div>
            {formData.mediasSociaux.length === 0 && (
              <p className="form-error-hint">Veuillez sélectionner au moins une option</p>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Génération en cours...' : 'Générer mon texte'}
            </button>
            <button 
              type="button"
              onClick={handleTest}
              className="btn-secondary test-button"
              disabled={isSubmitting}
            >
              TEST
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
