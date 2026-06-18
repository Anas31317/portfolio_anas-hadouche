# Portfolio — Anas Hadouche

Portfolio personnel d'Anas Hadouche, étudiant ingénieur Bac+5 à l'ICAM Toulouse.

**Live** : [anas31317.github.io/anas-hadouche-portfolio](https://anas31317.github.io/anas-hadouche-portfolio/)

## Stack

Site statique — HTML / CSS vanilla. Aucune dépendance, aucun framework.

## Structure

```
anas-hadouche-portfolio/
├── docs/                        ← servi par GitHub Pages
│   ├── index.html               ← page d'accueil (présentation, compétences, parcours)
│   ├── projects.html            ← liste de tous les projets
│   ├── assets/
│   │   ├── style.css            ← styles globaux (index + projects)
│   │   ├── project.css          ← styles des pages projet individuelles
│   │   ├── img/
│   │   │   ├── picture_anas_hadouche.jpg
│   │   │   └── bateau/          ← photos et captures du projet bateau
│   │   ├── pdf/
│   │   │   ├── cv_anas_hadouche.pdf
│   │   │   ├── rapport_de_stage_ocp_anas_hadouche.pdf
│   │   │   └── toeic_anas_hadouche.pdf
│   │   └── videos/
│   │       └── boat_demo.mp4
│   └── projects/
│       ├── bateau.html          ← projet : voilier connecté (ICAM)
│       ├── ocp.html             ← projet : stage OCP (Maroc)
│       └── tag-box.html         ← projet : Tag Box
└── README.md
```

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Page principale — présentation, compétences, parcours scolaire |
| `projects.html` | Liste des projets réalisés |
| `projects/bateau.html` | Projet voilier connecté — CAO, électronique, web |
| `projects/ocp.html` | Stage ingénieur chez OCP (Maroc) |
| `projects/tag-box.html` | Projet Tag Box |

## Hébergement GitHub Pages

Le site est servi depuis le dossier `/docs` sur la branche `main`.

**Configuration** : Settings → Pages → Deploy from branch → `main` → `/docs`

## Développement local

Ouvre `docs/index.html` directement dans un navigateur. Aucun serveur requis.
