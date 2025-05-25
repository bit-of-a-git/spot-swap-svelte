<script lang="ts">
  // import 'leaflet/dist/leaflet.css';
  import { onMount } from 'svelte';
  import type { Control, Map as LeafletMap } from 'leaflet';

  // Additionally takes id, activeLayer, zoom, and minZoom as props, to allow further customisation
  let {
    height = 80,
    id = 'home-map-id',
    activeLayer = 'Terrain',
    zoom = 8,
    minZoom = 5,
  } = $props();
  let location = { lat: 53.2734, lng: -7.7783203 };

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import('leaflet');
    L = leaflet.default;
    baseLayers = {
      Terrain: leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }),
      Satellite: leaflet.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      ),
    };
    let defaultLayer = baseLayers[activeLayer];
    imap = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer],
    });
    control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
  });

  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import('leaflet');
    L = leaflet.default;
    const marker = L.marker([lat, lng]).addTo(imap);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }

  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import('leaflet');
    L = leaflet.default;
    imap.flyTo({ lat: lat, lng: lng });
  }

  // Loops through each layer of the map and removes it if it is a marker
  // Used when deleting markers from the map
  export async function clearMarkers() {
    const leaflet = await import('leaflet');
    L = leaflet.default;
    imap.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        imap.removeLayer(layer);
      }
    });
  }
</script>

<div {id} class="box" style="height: {height}vh"></div>
