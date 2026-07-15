# Game of Grill — Website

Statische Website (HTML · CSS · JS, ohne Framework) für den Burger- &amp; Grill-Laden
**Game of Grill** (Inhaber: Hani). Schwarz · Weiß · Dunkelgold, heraldisches
Design (drei Schwerter + Flammen) nach den echten Ladenschildern.

## Struktur
```
Game-of-Grill/
├── index.html            Startseite (Hero, Über uns, Foto-Bänder, Speisekarte+Kategorien,
│                         Galerie, Kundenstimmen, FAQ, Besuch)
├── speisekarte.html      Vollständige Speisekarte (von den Fotos übertragen)
├── impressum.html        Impressum (mit Platzhaltern)
├── datenschutz.html      Datenschutzerklärung (DSGVO, mit Platzhaltern)
├── css/style.css         Design-System
├── js/main.js            Motion (Glut-Partikel), Reveals, Menü, Öffnungszeiten-Logik
├── assets/
│   ├── emblem.svg        Wappen (3 Schwerter + Flammen, Gold)
│   └── favicon.svg
└── images/
    ├── *.jpg             Echte Fotos vom Laden (Hero/Galerie/Über uns)
    ├── README.md         Anleitung zum Hochladen weiterer Fotos
    └── speisekarte-original/   Original-Fotos der Karte (Referenz)
```

## Lokal ansehen
Einfach `index.html` im Browser öffnen — oder ein Mini-Server:
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Noch zu erledigen (Platzhalter)
Gold markierte Stellen bzw. `PLATZHALTER` ersetzen:
- **Impressum:** vollständiger Name, Anschrift, Telefon, E-Mail, USt-IdNr., Aufsichtsbehörde
- **Datenschutz:** verantwortliche Stelle, Hoster, ggf. Google-Fonts-Self-Hosting
- **Standort/Kontakt** auf der Startseite (Adresse, Telefon, E-Mail)
- **Speisekarte:** nur **Sides &amp; Getränke** fehlen noch (auf den Foto-Karten nicht enthalten); Allergen-Legende gegenprüfen

Bereits von den Fotos übernommen (fertig, kein Platzhalter): **Öffnungszeiten** (täglich 11:00–23:30) und die **komplette Speisekarte**.

## Design-Prinzipien (bewusst nicht generisch)
- Kein durchgehendes Card-Grid — Speisekarte als „Menü-Rolle", Galerie als Masonry mit schrägen Rahmen
- Schräge Schnitte (clip-path) statt runder Boxen
- Individuelles Wappen als Inline-SVG, animierter Hero (Schwerter fächern auf, Glut steigt)
- Gold-Gravur-Linien, Körnung, Roman-Ziffern

## SEO &amp; Barrierefreiheit
- Meta-Description &amp; Open-Graph je Seite, `Restaurant`-JSON-LD
- Aussagekräftige Alt-Texte, saubere H1→H2→H3-Struktur
- `prefers-reduced-motion` respektiert, Tastatur-/Screenreader-freundliche Navigation

## Hinweise zu den Connectoren
Die Umgebung blockiert externe Design-CDNs (Canva/Cloudinary/HeyGen-Downloads → 403),
daher wurden Wappen, Badges und der animierte Hero **selbst als SVG/CSS/JS** gebaut
(robust, ohne externe Abhängigkeit). Ein Canva-Emblem-Entwurf liegt zusätzlich im
Canva-Konto. Fotobearbeitung (Adobe/Cloudinary) und ein Video-Clip (Descript/HeyGen)
können ergänzt werden, sobald die Netzwerk-Freigabe vorliegt.
