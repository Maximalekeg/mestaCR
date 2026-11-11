// Inicializace mapy – střed ČR
const mapa = L.map("mapa").setView([49.8, 15.5], 8);

// Podkladová vrstva OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

// Načtení bodů z GeoJSONu
fetch("body.geojson")
  .then((odpoved) => {
    if (!odpoved.ok) {
      throw new Error("HTTP " + odpoved.status);
    }
    return odpoved.json();
  })
  .then((data) => {
    const vrstva = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const { id, nazev, popisek } = feature.properties;
        layer.bindPopup(
          `<div class="popup">
             <h3>${nazev}</h3>
             <p>${popisek}</p>
           </div>`
        );
        layer.bindTooltip(nazev);
        layer.feature.properties.id = id;
      }
    }).addTo(mapa);

    // Přiblížení na všechny body
    mapa.fitBounds(vrstva.getBounds(), { padding: [50, 50] });
  })
  .catch((chyba) => {
    console.error("Nepodařilo se načíst body.geojson:", chyba);
    alert(
      "Nepodařilo se načíst data. Spusť projekt přes lokální server (viz README)."
    );
  });
