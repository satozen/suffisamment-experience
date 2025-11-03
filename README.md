# Suffisamment

Application qui génère un texte personnalisé pour accompagner le deuil. Utilise Claude Anthropic pour créer des textes émotionnels et personnalisés basés sur les réponses d'un questionnaire.

## Fonctionnalités

- **Landing page** : Présentation du concept et de l'offre
- **Questionnaire** : Formulaire de questions pour collecter les informations nécessaires
  - "Qu'est-ce qui te manque le plus ?"
  - "Tu le décrirais comment à un ami ?"
  - Relation avec la personne décédée
  - Moments préférés ensemble
- **Génération de texte** : Utilisation de Claude Anthropic API pour créer un texte personnalisé
- **Régénération** : Possibilité de régénérer le texte avec les mêmes informations
- **Page d'unboxing** : Présentation du kit émotionnel et de l'expérience

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
Créer un fichier `.env.local` avec :
```
ANTHROPIC_API_KEY=your_api_key_here
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## Structure du projet

- `app/` : Pages Next.js (App Router)
  - `page.tsx` : Page d'accueil
  - `questionnaire/` : Page de formulaire
  - `resultat/` : Page affichant le texte généré
  - `unboxing/` : Page du kit d'unboxing
  - `concept/` : Page explicative du concept
  - `api/generate-text/` : Route API pour générer le texte avec Claude

## Technologies

- Next.js 14 (App Router)
- React 18
- TypeScript
- Claude Anthropic SDK
- Police Belleza (Google Fonts)

## Notes

- En production, il faudrait implémenter une base de données pour stocker les textes générés
- Le système utilise actuellement sessionStorage pour stocker temporairement les données
- La clé API Claude doit être configurée dans `.env.local`
