# News & Blog

Dieser Ordner enthält alle Blog-Posts für die La Vida Website.

## URL-Struktur

- `/news-blog` - Übersicht aller Blog-Posts
- `/news-blog/:postId` - Einzelansicht eines Blog-Posts

## Wie füge ich einen neuen Blog-Post hinzu?

1. **Erstelle eine neue JSON-Datei** in diesem Ordner
   - Benenne die Datei nach dem Schema: `YYYY-MM-DD-kurzer-titel.json`
   - Beispiel: `2024-03-15-oster-special.json`

2. **Kopiere die folgende Vorlage** und passe sie an:

```json
{
  "id": "eindeutige-id-ohne-leerzeichen",
  "title": "Titel deines Blog-Posts",
  "excerpt": "Kurze Zusammenfassung (2-3 Sätze), die in der Übersicht angezeigt wird",
  "content": "Hier kommt der volle Text deines Blog-Posts hin.\n\nDu kannst:\n\n- Absätze mit \\n\\n erstellen\n- **Fett** mit Sternchen um Text\n- Listen mit - oder * am Zeilenanfang\n\n## Überschriften mit ## am Anfang",
  "date": "2024-03-15",
  "image": "/images/dein-bild.jpg",
  "tags": ["Neuigkeiten", "Sommer", "Wein"],
  "featured": false
}
```

3. **Felder erklärt:**

| Feld | Erforderlich | Beschreibung |
|------|-------------|--------------|
| `id` | Ja | Eindeutige Kennung (keine Leerzeichen, nur Buchstaben, Zahlen, Bindestriche). Diese ID wird in der URL verwendet: `/news-blog/deine-id` |
| `title` | Ja | Der Titel des Blog-Posts |
| `excerpt` | Ja | Kurze Zusammenfassung für die Übersicht |
| `content` | Ja | Der vollständige Text des Posts |
| `date` | Ja | Veröffentlichungsdatum im Format YYYY-MM-DD |
| `image` | Nein | Pfad zum Bild (optional, z.B. `/images/image2.jpeg`) |
| `tags` | Nein | Array von Tags für die Suche. Wichtig: Tags "Events" oder "Neuigkeiten" erscheinen in der Kategorie-Filterung! |
| `featured` | Nein | `true` für Highlight-Posts, `false` oder weglassen für normale Posts |

4. **Speichere die Datei** - der Post ist automatisch verfügbar unter:
   - Übersicht: `http://localhost:3000/news-blog`
   - Detailseite: `http://localhost:3000/news-blog/deine-id`

## Kategorien

Für die Filter-Buttons gibt es nur zwei feste Kategorien:
- **Events** - Für Veranstaltungen, Live-Musik, Special Events
- **Neuigkeiten** - Für allgemeine News, neue Speisekarten, Ankündigungen

Damit ein Post unter einer Kategorie erscheint, füge den entsprechenden Tag hinzu:
```json
"tags": ["Events", "Live-Musik", "Oud"]
```
oder
```json
"tags": ["Neuigkeiten", "Speisekarte"]
```

## Tags für die Suche

Tags werden auch für die Suchleiste verwendet. Nutze relevante Schlagwörter:
- `"tags": ["Wein", "Sommer", "Tapas", "Reservierung"]`
- `"tags": ["Live-Musik", "Orientalisch", "Freitag"]`
- `"tags": ["Ostern", "Special", "Menü"]`

Die Suche findet Posts in:
- Titel
- Excerpt (Zusammenfassung)
- Content (Inhalt)
- Tags

## Formatierung im Content

Der `content` unterstützt einfache Formatierung:

- **Absätze:** Trenne mit einer leeren Zeile (`\n\n`)
- **Fetter Text:** Umrahme mit `**Text**`
- **Überschriften:** Beginne mit `## Überschrift`
- **Listen:** Beginne jede Zeile mit `- ` oder `* `

## Beispiele

Siehe die vorhandenen Dateien in diesem Ordner:
- `2024-01-15-neue-speisekarte.json` (Neuigkeiten, Featured)
  - URL: `/news-blog/neue-speisekarte-2024`
- `2024-02-20-live-musik.json` (Events)
  - URL: `/news-blog/live-musik-februar`

## Wichtig

- Die Datei muss gültiges JSON sein (Achte auf Kommas und Anführungszeichen!)
- Das `id`-Feld bestimmt die URL der Detailseite
- Das `date`-Feld bestimmt die Sortierung (neueste zuerst)
- Bilder sollten im `/public/images/` Ordner liegen
