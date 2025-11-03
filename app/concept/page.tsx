// Page concept expliquant l'approche et la mission de Suffisamment
import Link from 'next/link'
import './concept.css'

export default function ConceptPage() {
  return (
    <div className="concept-container">
      <div className="concept-content">
        <h1>Le Concept</h1>
        
        <div className="concept-section">
          <h2>L'art qui fait du bien au quotidien</h2>
          <p>
            Suffisamment, c'est une approche douce et empathique pour accompagner les moments difficiles de la vie. 
            Quand les mots manquent pour exprimer ce qui se passe en nous, l'art et l'écriture peuvent devenir des ponts 
            vers la guérison.
          </p>
        </div>

        <div className="concept-section">
          <h2>Un texte unique pour chaque deuil</h2>
          <p>
            Chaque perte est unique. Chaque relation est unique. C'est pourquoi chaque texte que nous créons est 
            entièrement personnalisé, basé sur ce que tu partages avec nous. Nous utilisons l'intelligence artificielle 
            Claude d'Anthropic pour créer des textes qui résonnent avec ta réalité, avec ta douleur, avec ton amour.
          </p>
        </div>

        <div className="concept-section">
          <h2>Envoi par la poste</h2>
          <p>
            Dans un monde numérique, il y a quelque chose de profondément touchant à recevoir un texte imprimé, 
            envoyé par la poste. C'est un ralentissement, un moment de pause, une reconnaissance que certaines choses 
            méritent d'être tangibles, palpables, réelles.
          </p>
        </div>

        <div className="concept-section">
          <h2>Le kit d'unboxing émotionnel</h2>
          <p>
            Recevoir ce paquet, c'est recevoir plus qu'un texte. C'est recevoir un espace pour toi, un moment pour 
            ressentir, pour pleurer si besoin, pour honorer ce qui a été. C'est recevoir la permission de prendre 
            le temps que ton deuil demande.
          </p>
        </div>

        <div className="concept-cta">
          <Link href="/questionnaire" className="btn-primary">
            Créer un cadeau personnalisé
          </Link>
          <Link href="/" className="btn-secondary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
