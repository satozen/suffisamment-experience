// API route pour générer un texte personnalisé d'accompagnement au deuil avec Claude Anthropic
// Prend les réponses du questionnaire et génère un texte émotionnel et personnalisé
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const prompt = `Tu es un écrivain sensible et empathique spécialisé dans l'accompagnement du deuil. Tu écris des textes personnels et touchants qui aident à exprimer la douleur et à honorer la mémoire d'un être cher.

Informations sur la personne en deuil:
- Ce qui lui manque le plus: ${formData.ceQuiManqueLePlus}
- Description de la personne décédée: ${formData.descriptionAmi}
- Relation: ${formData.relation}
- Moments préférés ensemble: ${formData.momentsPreferes || 'Non spécifié'}

Écris un texte personnel, émotionnel et réconfortant qui:
1. Reconnaît la douleur et la perte
2. Célèbre la mémoire de la personne décédée en utilisant les détails fournis
3. Offre du réconfort et de la compréhension
4. Utilise un langage poétique mais authentique
5. Reste personnel et intime, comme si c'était écrit par quelqu'un qui comprend vraiment

Le texte doit être entre 300 et 500 mots, écrit en français, avec un ton chaleureux et compatissant.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const generatedText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''

    // Générer un ID unique pour ce texte
    const textId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

    // En production, tu devrais sauvegarder le texte et l'ID dans une base de données
    // Pour l'instant, on retourne juste l'ID et le texte

    return NextResponse.json({
      textId,
      text: generatedText,
      formData, // Optionnel: pour permettre la régénération
    })
  } catch (error) {
    console.error('Error generating text:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du texte' },
      { status: 500 }
    )
  }
}
