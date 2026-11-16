"""
Génère les cartes des pages Expériences et Projets à partir d'un seul modèle.

Chaque carte suit exactement la même structure :
  - 1 tag de domaine          "Domaine · Domaine"
  - titre                     "Nom — description courte"
  - ligne 1 (cadre)           "Type et durée · lieu ou contexte."
  - ligne 2 (mission)         "Mission : ..."
  - ligne 3 (réalisé)         "Réalisé : ..."
  - 5 compétences clés
  - pied de carte             "Organisation · ville · période"   +  lien "Voir ..."

Pour ajouter ou modifier une carte : éditer CARTES ci-dessous, puis lancer
    python3 tools/cartes.py
Le script remplace le contenu entre les marqueurs <!-- CARTES:xxx --> et <!-- /CARTES:xxx -->.
"""
import html, pathlib, re

DOCS = pathlib.Path(__file__).resolve().parent.parent / "docs"

CARTES = {
    "experiences": [
        dict(
            lien="projects/tag-box.html", cta=("Voir l'expérience →", "See experience →"),
            tag=("Web · Industrie", "Web · Industry"),
            titre=("Stage assistant ingénieur — Lear Corporation", "Assistant Engineer Internship — Lear Corporation"),
            cadre=("Stage de 3 mois · Zone de coupe, Meknès (Maroc).", "3-month internship · Cutting area, Meknès (Morocco)."),
            mission=("Mission : digitaliser le Tag Box, le système papier de signalement des anomalies de maintenance.",
                     "Mission: digitalise the Tag Box, the paper system used to report maintenance anomalies."),
            realise=("Réalisé : application web full-stack avec 4 rôles, check-lists 1er niveau, suivi des arrêts et KPI MTTR / MTBF.",
                     "Delivered: full-stack web app with 4 roles, first-level checklists, downtime tracking and MTTR / MTBF KPIs."),
            competences=["Python", "Flask", "MySQL", "HTML / CSS / JS", "TPM · Lean"],
            pied=("Lear Corporation · Meknès · Mai – Août 2026", "Lear Corporation · Meknès · May – Aug 2026"),
        ),
        dict(
            lien="projects/ocp.html", cta=("Voir l'expérience →", "See experience →"),
            tag=("Électrique · Maintenance", "Electrical · Maintenance"),
            titre=("Stage technicien maintenance électrique — OCP Group", "Electrical Maintenance Technician Internship — OCP Group"),
            cadre=("Stage de 2 mois · Mine MEA, Khouribga (Maroc).", "2-month internship · MEA mine, Khouribga (Morocco)."),
            mission=("Mission : étudier le réseau Wi-Fi et fibre optique des stockeuses de phosphate.",
                     "Mission: study the Wi-Fi and fibre-optic network of the phosphate stackers."),
            realise=("Réalisé : appui aux techniciens et rotation dans 4 secteurs (installations fixes, réseaux HTA/HTB, draglines, engins).",
                     "Delivered: support to technicians and rotation across 4 departments (fixed installations, HV/EHV networks, draglines, mobile equipment)."),
            competences=[("Fibre optique", "Fibre optics"), "Wi-Fi PTP / PMP", "HTA / HTB", ("Schémas électriques", "Electrical diagrams"), "HSE"],
            pied=("OCP Group · Khouribga · Jan – Fév 2025", "OCP Group · Khouribga · Jan – Feb 2025"),
        ),
        dict(
            lien="projects/norauto.html", cta=("Voir l'expérience →", "See experience →"),
            tag=("Mécanique automobile · Atelier", "Automotive · Workshop"),
            titre=("Stage opérateur / ouvrier — Norauto", "Operator / Worker Internship — Norauto"),
            cadre=("Stage de 2 mois · Pôle pneumatique, Colomiers (France).", "2-month internship · Tyre department, Colomiers (France)."),
            mission=("Mission : renforcer l'équipe de l'atelier sur les interventions pneumatiques.",
                     "Mission: support the workshop team on tyre jobs."),
            realise=("Réalisé : montage et équilibrage d'environ 60 pneus par jour en équipe de quatre, crevaisons, parallélisme et contrôle des freins.",
                     "Delivered: fitting and balancing about 60 tyres a day in a team of four, punctures, wheel alignment and brake checks."),
            competences=[("Pneumatique", "Tyres"), ("Équilibrage", "Balancing"), ("Parallélisme", "Wheel alignment"), ("Freinage", "Brakes"), ("Sécurité atelier", "Workshop safety")],
            pied=("Norauto · Colomiers · Juin – Juil 2024", "Norauto · Colomiers · Jun – Jul 2024"),
        ),
    ],
    "projets-scolaires": [
        dict(
            lien="projects/bateau.html", cta=("Voir le projet →", "See project →"),
            tag=("Mécanique · Embarqué", "Mechanical · Embedded"),
            titre=("Bateau autonome — Conception, fabrication & système embarqué", "Autonomous Boat — Design, Manufacturing & Embedded System"),
            cadre=("Projet fil rouge de 2 ans · ICAM Toulouse, équipe de 5.", "2-year project · ICAM Toulouse, team of 5."),
            mission=("Mission : reprendre le dossier d'une autre équipe et le mener jusqu'à la mise à l'eau.",
                     "Mission: take over another team's project and take it all the way to launch."),
            realise=("Réalisé : coque en bois conçue en CAO, électronique ESP32 / FPGA, télécommande web et autopilote GPS ; 3 victoires sur 3 courses.",
                     "Delivered: CAD-designed wooden hull, ESP32 / FPGA electronics, web remote control and GPS autopilot; 3 wins out of 3 races."),
            competences=["ESP32", "FPGA", "C++ / Arduino", "OnShape / SolidWorks", "WebSocket"],
            pied=("ICAM Toulouse · Sept 2024 – Mai 2026", "ICAM Toulouse · Sept 2024 – May 2026"),
        ),
    ],
    "projets-personnels": [
        dict(
            lien="projects/suivi-muscu.html", cta=("Voir le projet →", "See project →"),
            tag=("Web · Application mobile", "Web · Mobile app"),
            titre=("Suivi Muscu — Application de suivi d'entraînement", "Suivi Muscu — Workout Tracking App"),
            cadre=("Projet personnel · Développé seul, utilisé par un petit groupe d'amis.", "Personal project · Built on my own, used by a small group of friends."),
            mission=("Mission : suivre ses séances de musculation et de cardio, même sans réseau à la salle.",
                     "Mission: track weight training and cardio sessions, even offline at the gym."),
            realise=("Réalisé : PWA hors ligne avec comptes sécurisés, courbes de progression, 1RM, partage entre amis et 170 exercices.",
                     "Delivered: offline PWA with secure accounts, progress charts, 1RM, sharing with friends and 170 exercises."),
            competences=["HTML / CSS / JS", "PWA", "Supabase", "PostgreSQL", "GitHub Pages"],
            pied=("Projet personnel · Depuis sept. 2026", "Personal project · Since Sept 2026"),
        ),
    ],
}

PAGES = {"experiences": "experiences.html", "projets-scolaires": "projects.html", "projets-personnels": "projects.html"}


def t(fr, en, tag="span", cls=None, style=None):
    a = f' class="{cls}"' if cls else ""
    a += f' style="{style}"' if style else ""
    return f'<{tag}{a} data-fr="{html.escape(fr)}" data-en="{html.escape(en)}">{html.escape(fr, quote=False)}</{tag}>'


def carte(c):
    assert len(c["competences"]) == 5, c["titre"][0]
    for k in ("cadre", "mission", "realise"):
        assert c[k][0].endswith("."), (c["titre"][0], k)
    fr = "\n".join([c["cadre"][0], c["mission"][0], c["realise"][0]])
    en = "\n".join([c["cadre"][1], c["mission"][1], c["realise"][1]])
    chips = "\n".join(
        "        " + (t(x[0], x[1], cls="stack-chip") if isinstance(x, tuple) else f'<span class="stack-chip">{html.escape(x)}</span>')
        for x in c["competences"])
    return f'''    <a href="{c["lien"]}" class="proj-card proj-card-link">
      <div class="proj-top">
        {t(*c["tag"], cls="tag")}
      </div>
      {t(*c["titre"], tag="div", cls="proj-title")}
      {t(fr, en, tag="div", cls="proj-desc", style="white-space:pre-line")}
      <div class="proj-stack">
{chips}
      </div>
      <div class="proj-footer">
        {t(*c["pied"], cls="proj-meta-line")}
        {t(*c["cta"], cls="proj-cta")}
      </div>
    </a>
'''


def main():
    for cle, cartes in CARTES.items():
        p = DOCS / PAGES[cle]
        s = p.read_text()
        bloc = f"    <!-- CARTES:{cle} (généré par tools/cartes.py, ne pas modifier à la main) -->\n" + "\n".join(carte(c) for c in cartes) + f"    <!-- /CARTES:{cle} -->\n"
        new, n = re.subn(rf"    <!-- CARTES:{cle}.*?<!-- /CARTES:{cle} -->\n", lambda m: bloc, s, flags=re.S)
        assert n == 1, f"marqueurs CARTES:{cle} introuvables dans {p.name}"
        p.write_text(new)
        print(f"{p.name} : {len(cartes)} carte(s) {cle}")


if __name__ == "__main__":
    main()
