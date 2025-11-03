// API route pour générer un texte personnalisé d'accompagnement au deuil avec Claude Anthropic
// Prend les réponses du questionnaire et génère un texte émotionnel et personnalisé
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Fonction pour générer un texte placeholder pour le développement
function generatePlaceholderText(formData: any): string {
  const tonNom = formData.tonNom || 'mon enfant'
  const nomPersonne = formData.nomPersonne || 'ta maman'
  
  // Déterminer le genre approximatif pour bien-aimé/bien-aimée
  const isFeminine = tonNom.toLowerCase().endsWith('e') && !tonNom.toLowerCase().endsWith('le') && !tonNom.toLowerCase().endsWith('ne')
  const bienAime = isFeminine ? 'bien-aimée' : 'bien-aimé'
  
  const momentsText = formData.momentsPreferes 
    ? `Je me souviens encore de ces instants précieux : ${formData.momentsPreferes.substring(0, 150)}...`
    : 'Ces souvenirs précieux que nous avons créés ensemble, ces moments qui m\'ont tant apporté de joie.'
  
  const manqueText = formData.ceQuiManqueLePlus 
    ? `Je sais que ce qui te manque le plus, c'est ${formData.ceQuiManqueLePlus.substring(0, 200)}.`
    : 'Je comprends ta douleur et ton vide. Je sais que chaque jour sans moi est un défi.'
  
  const descriptionText = formData.descriptionAmi 
    ? `Je me souviens quand tu parlais de moi : ${formData.descriptionAmi.substring(0, 250)}. Ces mots me touchent encore aujourd'hui et me rappellent combien notre relation était précieuse.\n\n`
    : ''
  
  return `${tonNom} ${bienAime},

Si je pouvais te parler, voici ce que je voudrais te dire. Je sais à quel point tu souffres et combien tu me manques. Chaque jour que tu vis sans moi, je le vis à tes côtés, même si tu ne peux pas me voir.

Ce qui me console, c'est de savoir que tu gardes vivants les moments que nous avons partagés. ${momentsText}

${manqueText}

${descriptionText}Ne pense pas que je suis loin. Je suis là, dans chaque souvenir que tu chéris, dans chaque moment où tu ris ou pleures. Je suis dans l'amour que tu portes aux autres, dans la gentillesse que tu montres. Mon essence vit encore à travers toi.

Prends le temps de pleurer si tu en as besoin. Prends le temps de te souvenir. Et surtout, prends soin de toi. C'est ce que je souhaiterais le plus pour toi maintenant - que tu puisses trouver la paix et continuer à vivre pleinement, tout en gardant notre amour dans ton cœur.

Avec tout mon amour pour l'éternité,
${nomPersonne}

---
(Message placeholder généré pour le développement - le texte final sera créé par Claude Anthropic)`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { test, ...formData } = body

    // Mode test : retourner un placeholder
    if (test) {
      const placeholderText = generatePlaceholderText(formData)
      const textId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      
      return NextResponse.json({
        textId,
        text: placeholderText,
        formData,
        isTest: true,
      })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const prompt = `Tu es un écrivain sensible et empathique spécialisé dans l'accompagnement du deuil. Tu écris des textes personnels et touchants qui aident à exprimer la douleur et à honorer la mémoire d'un être cher.

Tu vas écrire un texte de la part de ${formData.nomPersonne || 'la personne décédée'}, adressé à ${formData.tonNom || 'la personne en deuil'}.

Informations sur la personne en deuil (${formData.tonNom || 'personne'}):
- Ce qui lui manque le plus: ${formData.ceQuiManqueLePlus}
- Description de la personne décédée (${formData.nomPersonne || 'la personne'}): ${formData.descriptionAmi}
- Relation: ${formData.relation}
- Moments préférés ensemble: ${formData.momentsPreferes || 'Non spécifié'}

Écris un texte personnel, émotionnel et réconfortant qui:
1. Est écrit à la première personne, comme si c'était ${formData.nomPersonne || 'la personne décédée'} qui parlait directement à ${formData.tonNom || 'toi'}
2. Reconnaît la douleur et la perte de ${formData.tonNom || 'la personne en deuil'}
3. Célèbre la relation et les moments partagés en utilisant les détails fournis
4. Offre du réconfort, de l'amour et de la compréhension
5. Utilise un langage poétique mais authentique et chaleureux
6. Reste personnel et intime, comme si c'était vraiment les mots que ${formData.nomPersonne || 'cette personne'} aurait voulu dire

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
