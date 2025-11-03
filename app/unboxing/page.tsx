// Page d'unboxing émotionnel - Présente le kit et l'expérience de réception
import './unboxing.css'

export default function UnboxingPage() {
  return (
    <div className="unboxing-container">
      <div className="unboxing-hero">
        <h1>Suffisamment l'Expérience</h1>
        <p className="unboxing-subtitle">Quand tu le reçois, voici le kit de l'unboxing émotionnel...</p>
      </div>

      <div className="unboxing-content">
        <div className="unboxing-section">
          <div className="unboxing-text">
            <h2>Ça va te brasser</h2>
            <p>
              C'est vraiment difficile un deuil. Quand la personne décède, la vie continue pour les autres, 
              mais toi il y a quelque chose qui va jamais revenir...
            </p>
            <p>
              C'est pour ça que chaque paquet Suffisamment est conçu avec soin. À l'intérieur, tu trouveras:
            </p>
          </div>
        </div>

        <div className="kit-items">
          <div className="kit-item">
            <div className="kit-icon">📜</div>
            <h3>Ton texte personnalisé</h3>
            <p>Imprimé avec soin sur un papier de qualité, ton texte unique qui célèbre la mémoire de l'être cher.</p>
          </div>

          <div className="kit-item">
            <div className="kit-icon">📦</div>
            <h3>Un paquet de mouchoirs</h3>
            <p>Parce que les émotions vont couler, et c'est normal. C'est le moment de les accueillir.</p>
          </div>

          <div className="kit-item">
            <div className="kit-icon">💝</div>
            <h3>Un espace pour toi</h3>
            <p>Un moment pour toi, pour ressentir, pour te souvenir, pour honorer ce qui a été.</p>
          </div>
        </div>

        <div className="unboxing-message">
          <p className="message-text">
            Recevoir ce paquet, c'est recevoir la permission de ressentir. C'est recevoir la reconnaissance 
            que ta douleur est valide, que ton chagrin mérite d'être honoré.
          </p>
          <p className="message-text">
            Prends le temps qu'il te faut. Il n'y a pas de bonne ou de mauvaise façon de vivre un deuil.
          </p>
        </div>

        <div className="unboxing-cta">
          <a href="/" className="btn-primary">Retour à l'accueil</a>
          <a href="/questionnaire" className="btn-secondary">Créer un cadeau</a>
        </div>
      </div>
    </div>
  )
}
