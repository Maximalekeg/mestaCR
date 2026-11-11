# Mapa měst ČR (Leaflet)

Jednoduchá webová mapa zobrazující města České republiky z GeoJSON souboru.

## Struktura projektu

| Soubor         | Popis                                              |
|----------------|----------------------------------------------------|
| `index.html`   | Hlavní stránka, načítá Leaflet, styly a skript     |
| `map.js`       | Inicializace mapy, načtení GeoJSONu, popupy        |
| `styl.css`     | Vzhled stránky a popupů                            |
| `body.geojson` | Data – body měst s atributy `id`, `nazev`, `popisek` |
| `README.md`    | Tento soubor                                       |

## Spuštění

Data se načítají přes `fetch`, proto **nestačí otevřít `index.html` dvojklikem** (prohlížeč blokuje načítání lokálních souborů). Spusť lokální server:

```bash
# Python 3
python -m http.server 8000
```

nebo

```bash
# Node.js
npx serve
```

Pak otevři <http://localhost:8000>.

## Přidání dalšího města

Do pole `features` v `body.geojson` přidej nový objekt. Pozor: v GeoJSONu je pořadí souřadnic **[délka, šířka]** (lon, lat).

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město ČR."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

Mapa se po obnovení stránky automaticky přiblíží tak, aby byly vidět všechny body.

## Použité technologie

- [Leaflet](https://leafletjs.com/) 1.9.4
- Podkladová mapa © přispěvatelé [OpenStreetMap](https://www.openstreetmap.org/copyright)
