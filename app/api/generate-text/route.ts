// API route pour générer un texte personnalisé d'accompagnement au deuil avec Claude Anthropic
// Prend les réponses du questionnaire et génère un texte émotionnel et personnalisé
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Fonction pour générer un texte placeholder pour le développement
function generatePlaceholderText(formData: any): string {
  const tonNom = formData.tonNom || 'toi'
  const nomPersonne = formData.nomPersonne || 'cette personne chère'
  
  const manqueText = formData.ceQuiManqueLePlus 
    ? `Ce qui te manque le plus, c'est ${formData.ceQuiManqueLePlus.substring(0, 150)}.`
    : 'Ces moments partagés qui semblent maintenant si loin.'
  
  return `Il n'y a pas de mots magiques pour effacer la douleur.

Pour revenir en arrière.

Mais il y a des mots pour réconforter. Pour que cette traversée soit moins solitaire.

${tonNom}, je vois cette épreuve qui a tout chamboulé. ${manqueText}

Je sais que certains jours, juste respirer te demande déjà beaucoup.

Que parfois, sortir du lit semble impossible.

Que les nuits sont remplies de questions sans réponses qui tournent en boucle.

Tu n'as pas à être forte tous les jours.

Tu n'as pas à sourire quand tu as envie de pleurer.

Tu n'as pas à rassurer les autres quand c'est toi qui as besoin d'un câlin.

Tu as le droit d'être fâchée. Tu as le droit d'avoir peur de demain.

Tu as le droit de te sentir perdue dans ce brouillard émotionnel.

Je ne te dirai pas ces phrases vides comme "tout ira bien" ou "reste positive".

Je ne te dirai pas non plus que "d'autres ont vécu pire".

Ce que je te dirai, c'est que je suis là.

Pour t'écouter quand tu voudras parler. Pour respecter ton silence quand les mots te manqueront.

Pour tenir ta main dans les moments sombres.

${formData.momentsPreferes ? `Je me souviens de ces moments ensemble : ${formData.momentsPreferes.substring(0, 200)}...` : ''}

Ces petits moments de grâce surgissent parfois, inattendus, au cœur même de l'épreuve.

Un éclat de rire soudain. Une conversation profonde. Un instant de paix volé au chaos.

J'espère que cette œuvre te rappellera à chaque regard que tu n'es pas seule.

Que tu es SUFFISAMMENT.

Résiliente pour traverser cette épreuve.

Vis chaque jour comme il vient. Tu n'as pas besoin d'être une guerrière.

Tu as juste besoin d'être toi, avec tes hauts et tes bas.

Prends soin de toi comme tu peux. Tous tes sentiments sont normaux.

Repose-toi quand ton corps te le demande.

Célèbre les petites victoires - même se lever peut être un triomphe certains jours.

Je crois en toi. Je crois que tu peux traverser cette épreuve.

Je crois que même dans les moments les plus sombres, tu restes toi, précieuse et profondément aimée.

---
(Message placeholder de test - le texte final sera généré par Claude Anthropic)`
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

    const prompt = `Tu es un écrivain sensible et empathique spécialisé dans l'accompagnement du deuil. Tu écris des textes personnels et touchants qui offrent du réconfort authentique.

Tu vas écrire un texte de réconfort adressé à ${formData.tonNom || 'la personne en deuil'}, à propos de ${formData.nomPersonne || 'la personne décédée'}.

Informations:
- Ce qui manque le plus: ${formData.ceQuiManqueLePlus}
- Description de ${formData.nomPersonne || 'la personne'}: ${formData.descriptionAmi}
- Relation: ${formData.relation}
- Moments préférés ensemble: ${formData.momentsPreferes || 'Non spécifié'}

STYLE TRÈS IMPORTANT - Suis ce style exactement:
- Utilise des phrases courtes et percutantes
- Fais des paragraphes de 1-3 lignes maximum
- Tutoie directement la personne
- Sois honnête et authentique, pas de fausses promesses
- Valide les émotions difficiles (colère, peur, épuisement)
- Donne la permission de ne pas être fort/forte
- Utilise des métaphores douces quand approprié
- Répète le mot SUFFISAMMENT dans le texte (en majuscules)
- Alterne entre reconnaissance de la douleur et lueurs d'espoir
- Termine sur une note de présence et d'encouragement doux

Structure suggérée:
1. Reconnaître qu'il n'y a pas de solution magique
2. Valider la douleur et les difficultés quotidiennes
3. Donner la permission de ressentir toutes les émotions
4. Rejeter les phrases clichées vides
5. Offrir une présence sincère et du soutien concret
6. Introduire des images d'espoir subtiles
7. Rappeler que la personne est SUFFISAMMENT (forte, courageuse, résiliente)
8. Terminer avec de la tendresse et de la foi en elle

Ton: empathique mais pas larmoyant, honnête mais pas brutal, réconfortant mais pas faussement optimiste.

Le texte doit être entre 400 et 600 mots, écrit en français, avec ce style de phrases courtes et percutantes.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
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
