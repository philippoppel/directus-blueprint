# Directus Blueprint Project

Ein vollständiges Beispielprojekt, das zeigt, wie Directus als Headless CMS mit Next.js integriert werden kann.

## 🚀 Features

- **Directus CMS**: Vollständig konfiguriertes Headless CMS mit Docker
- **Next.js Frontend**: Modernes React-Framework mit TypeScript und Tailwind CSS
- **Responsive Design**: Mobile-first Design mit Tailwind CSS
- **Content Management**: Einfache Verwaltung von Seiten und Bildern über Directus Admin Panel

## 📁 Projektstruktur

```
test_directus/
├── docker-compose.yml              # Directus + PostgreSQL Setup
├── directus-bootstrap.js          # Automatische Konfiguration von Collections
├── directus-public-config.js      # Public API Zugriff Konfiguration
├── frontend/                      # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Hauptseite
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Dynamische Seiten
│   │   └── lib/
│   │       └── directus.ts       # Directus Client Konfiguration
│   ├── .env.local               # Frontend Umgebungsvariablen
│   └── package.json
└── README.md
```

## 🛠 Installation & Setup

### 1. Directus Backend starten

```bash
# Docker Container starten
docker-compose up -d

# Warten bis Directus gestartet ist (ca. 30 Sekunden)
# Dann Collections und Sample-Daten erstellen
npm install @directus/sdk
node directus-bootstrap.js

# Public API Zugriff konfigurieren (optional)
node directus-public-config.js
```

### 2. Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Die Website ist dann unter http://localhost:3000 oder http://localhost:3002 erreichbar.

## 📊 Directus Admin Panel

- URL: http://localhost:8055
- Email: admin@example.com
- Passwort: directus123

## 🎨 Collections

Das Projekt erstellt automatisch folgende Collections:

### Pages
- **title**: Seitentitel
- **slug**: URL-Slug (z.B. "home", "about")
- **content**: HTML-Inhalt der Seite
- **hero_image**: Optionales Titelbild
- **published**: Veröffentlichungsstatus

### Gallery
- **title**: Titel des Bildes
- **description**: Beschreibung
- **image**: Bilddatei
- **alt_text**: Alt-Text für Barrierefreiheit

## 🔧 Anpassungen

### Neue Seiten hinzufügen
1. Im Directus Admin Panel zu "Pages" gehen
2. Neue Seite erstellen mit eindeutigem Slug
3. Seite auf "Published" setzen
4. Die Seite ist automatisch in der Navigation verfügbar

### Design anpassen
- Tailwind CSS Klassen in den React-Komponenten anpassen
- Globale Styles in `frontend/src/app/globals.css`

### Neue Collections hinzufügen
1. Neue Collection in Directus Admin erstellen
2. TypeScript Interfaces in `frontend/src/lib/directus.ts` hinzufügen
3. API-Calls in den React-Komponenten implementieren

## 🚀 Deployment

### Vercel Deployment
1. Repository zu GitHub pushen
2. Bei Vercel importieren
3. Umgebungsvariablen setzen:
   - `NEXT_PUBLIC_DIRECTUS_URL`: URL der Directus-Instanz

### Directus Cloud/Server
- Für Produktion sollte Directus auf einem echten Server oder Cloud-Service gehostet werden
- Die `NEXT_PUBLIC_DIRECTUS_URL` entsprechend anpassen

## 📝 Verwendete Technologien

- **Backend**: Directus, PostgreSQL, Docker
- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **API**: Directus SDK
- **Deployment**: Vercel (Frontend)

## 🔒 Sicherheit

- Directus ist standardmäßig mit CORS für localhost konfiguriert
- Für Produktion sollten die Sicherheitseinstellungen überprüft und angepasst werden
- Standard-Passwörter vor Deployment ändern

## 💡 Tipps

1. **Performance**: Next.js nutzt Static Site Generation (SSG) wo möglich
2. **SEO**: Meta-Tags werden automatisch aus Directus-Inhalten generiert
3. **Bilder**: Directus Assets können über die integrierte CDN-Funktionalität optimiert werden
4. **Caching**: Next.js cached API-Requests automatisch

## 🆘 Troubleshooting

### Directus nicht erreichbar
```bash
# Container Status prüfen
docker-compose ps

# Logs anschauen
docker-compose logs directus
```

### API Fehler im Frontend
- `.env.local` Datei prüfen
- Directus Public Permissions konfigurieren
- CORS Einstellungen in docker-compose.yml prüfen

### Build Fehler
```bash
cd frontend
npm run build
# Fehler beheben und erneut versuchen
```

---

**Viel Spaß beim Entwickeln! 🎉**