# Portfolio — Anas Hadouche

Portfolio personnel d'Anas Hadouche, étudiant ingénieur en 4ᵉ année à l'ICAM Toulouse, en recherche d'une alternance de 2 ans à partir de septembre 2027.

**Site** : [anas31317.github.io/portfolio_anas-hadouche](https://anas31317.github.io/portfolio_anas-hadouche/)

## Contenu

- **Accueil** : présentation, recherche d'alternance, à propos, expériences, projets, compétences, formation et contact.
- **Expériences** : 3 stages, chacun avec sa page détaillée.
  - Lear Corporation : stage assistant ingénieur, Meknès (Maroc), mai – août 2026
  - OCP Group : stage technicien maintenance électrique, Khouribga (Maroc), janvier – février 2025
  - Norauto : stage ouvrier, atelier pneumatique, Colomiers, juin – juillet 2024
- **Projets** : 2 projets, chacun avec sa page détaillée.
  - Bateau autonome : projet d'école, ICAM Toulouse, 2024 – 2026
  - Suivi Muscu : application de suivi d'entraînement, projet personnel
- **Documents** : CV, rapports de stage et certificat TOEIC (en PDF).

Le site est bilingue français / anglais (bouton FR / EN en haut de chaque page).

## Technologies

Site statique en HTML, CSS et JavaScript, sans framework ni dépendance.

## Structure

```
portfolio_anas-hadouche/
├── docs/                           ← dossier publié par GitHub Pages
│   ├── index.html                  ← page d'accueil
│   ├── experiences.html            ← liste des expériences
│   ├── projects.html               ← liste des projets
│   ├── projects/                   ← pages détaillées
│   │   ├── tag-box.html            ← stage Lear Corporation
│   │   ├── ocp.html                ← stage OCP Group
│   │   ├── norauto.html            ← stage Norauto
│   │   ├── bateau.html             ← Bateau autonome
│   │   └── suivi-muscu.html        ← Suivi Muscu
│   └── assets/
│       ├── style.css               ← styles communs à toutes les pages
│       ├── project.css             ← styles des pages détaillées
│       ├── viewer.js               ← visionneuse de captures d'écran
│       ├── img/                    ← photo, images des projets (bateau, muscu, tagbox)
│       ├── pdf/                    ← CV, rapports de stage, certificat TOEIC
│       └── videos/                 ← vidéo de démonstration du bateau
├── tools/
│   └── cartes.py                   ← génère les cartes des pages Expériences et Projets
└── README.md
```

## Modifier les cartes Expériences et Projets

Les cartes de `experiences.html` et `projects.html` sont générées à partir d'un seul modèle, pour qu'elles aient toutes la même structure. Pour en ajouter ou en modifier une, modifier la variable `CARTES` dans `tools/cartes.py`, puis lancer :

```
python3 tools/cartes.py
```

## Publication

Le site est publié avec GitHub Pages depuis le dossier `/docs` de la branche `main` (Settings → Pages → Deploy from a branch → `main` → `/docs`). Chaque modification poussée sur `main` est en ligne après une à deux minutes.

Après une modification de `style.css`, changer le numéro de version dans le lien de la feuille de style de `index.html` (`style.css?v=...`) pour que les navigateurs chargent la nouvelle version.

## Voir le site en local

Ouvrir `docs/index.html` dans un navigateur. Aucun serveur n'est nécessaire.
