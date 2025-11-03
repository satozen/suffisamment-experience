// Page de questionnaire pour générer un texte personnalisé d'accompagnement au deuil
// Collecte les réponses de l'utilisateur et les envoie à l'API Claude pour génération
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './questionnaire.css'

export default function QuestionnairePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    tonNom: '',
    nomPersonne: '',
    ceQuiManqueLePlus: '',
    descriptionAmi: '',
    relation: '',
    momentsPreferes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
            <label htmlFor="tonNom">
              Ton nom
            </label>
            <input
              type="text"
              id="tonNom"
              value={formData.tonNom}
              onChange={(e) => handleChange('tonNom', e.target.value)}
              placeholder="Ton prénom..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nomPersonne">
              Le nom de la personne que tu voudrais entendre
            </label>
            <input
              type="text"
              id="nomPersonne"
              value={formData.nomPersonne}
              onChange={(e) => handleChange('nomPersonne', e.target.value)}
              placeholder="Son prénom..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ceQuiManqueLePlus">
              Qu'est-ce qui te manque le plus ?
            </label>
            <textarea
              id="ceQuiManqueLePlus"
              value={formData.ceQuiManqueLePlus}
              onChange={(e) => handleChange('ceQuiManqueLePlus', e.target.value)}
              placeholder="Dis-moi ce qui te manque le plus chez cette personne..."
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descriptionAmi">
              Tu le décrirais comment à un ami ?
            </label>
            <textarea
              id="descriptionAmi"
              value={formData.descriptionAmi}
              onChange={(e) => handleChange('descriptionAmi', e.target.value)}
              placeholder="Comment tu décrirais cette personne à quelqu'un qui ne l'a jamais connue ?"
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="relation">
              Quelle était votre relation ?
            </label>
            <input
              type="text"
              id="relation"
              value={formData.relation}
              onChange={(e) => handleChange('relation', e.target.value)}
              placeholder="Ex: Ma mère, mon grand-père, mon meilleur ami..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="momentsPreferes">
              Quels étaient vos moments préférés ensemble ?
            </label>
            <textarea
              id="momentsPreferes"
              value={formData.momentsPreferes}
              onChange={(e) => handleChange('momentsPreferes', e.target.value)}
              placeholder="Parle-moi de ces moments précieux que vous avez partagés..."
              rows={5}
            />
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
