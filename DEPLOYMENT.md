# Deployment Anleitung

## 🚀 Vercel Deployment (Frontend)

### 1. Repository zu GitHub pushen

```bash
# Falls noch nicht geschehen
git remote add origin https://github.com/username/directus-blueprint.git
git branch -M main
git push -u origin main
```

### 2. Vercel Setup

1. Bei [Vercel](https://vercel.com) anmelden
2. "New Project" klicken
3. GitHub Repository auswählen: `directus-blueprint`
4. Root Directory auf `frontend` setzen
5. Build Settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Umgebungsvariablen konfigurieren

In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
```

### 4. Deploy

- Klick auf "Deploy"
- Warten bis Deployment abgeschlossen ist
- Live-URL testen

## 🐳 Directus Cloud/Server Deployment

### Option A: Directus Cloud
1. Bei [Directus Cloud](https://directus.cloud) registrieren
2. Neue Instanz erstellen
3. Collections und Daten übertragen
4. Public API Permissions konfigurieren
5. URL in Vercel Environment Variables aktualisieren

### Option B: Docker auf Server
```bash
# Auf dem Server
git clone https://github.com/username/directus-blueprint.git
cd directus-blueprint

# Environment für Produktion anpassen
cp docker-compose.yml docker-compose.prod.yml
# Produktions-Konfiguration anpassen

docker-compose -f docker-compose.prod.yml up -d
```

### CORS Konfiguration für Live-Deployment

In der docker-compose.yml oder Directus Settings:
```yaml
environment:
  CORS_ORIGIN: 'https://your-vercel-app.vercel.app'
```

## 📝 Live-Test Checkliste

- [ ] Website lädt ohne Fehler
- [ ] Navigation zwischen Seiten funktioniert
- [ ] Content wird aus Directus geladen
- [ ] Responsive Design auf Mobile/Desktop
- [ ] Admin Panel ist erreichbar
- [ ] Content-Updates werden angezeigt

## 🔧 Troubleshooting

### CORS Fehler
- Directus CORS_ORIGIN korrekt konfigurieren
- Beide URLs (mit/ohne www) hinzufügen

### API Nicht erreichbar
- NEXT_PUBLIC_DIRECTUS_URL prüfen
- Directus Public Permissions konfigurieren
- Netzwerk/Firewall Einstellungen prüfen

### Build Fehler auf Vercel
- TypeScript Fehler beheben
- Dependencies in package.json prüfen
- Build lokal testen: `npm run build`