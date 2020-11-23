<template>
  <div>
    <div ref="mapboxMap" id="map-container" class="mapbox-map" />
    <template>
      <slot :map="map" />
    </template>
  </div>
</template>

<script>
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { options } from "@/components/mapbox/options/map";
import { namespace as mapNamespace } from "@/store/modules/map";
import {
  namespace as userNamespace,
  actionTypes as userActionTypes
} from "@/store/modules/user";
import {
  namespace as locationNamespace,
  actionTypes as locationsActionTypes
} from "@/store/modules/location";
import { mapActions, mapState } from "vuex";

export default {
  props: {
    ...options
  },
  data: function() {
    return {
      map: null
    };
  },
  computed: {
    ...mapState({
      mapCenter: state => state[mapNamespace].center,
      locations: state => state[locationsNamespace].locations
    })
  },
  watch: {
    mapCenter(coordinates) {
      this.map.jumpTo({ center: coordinates });
    }
  },
  async beforeMount() {
    this.getLocations();
  },
  mounted() {
    this.initializeMap();
    this.locations.forEach(location => this.addMarker(location));
  },
  methods: {
    ...mapActions(newLocationNamespace, {
      setLocationAddress: newLocationsActionTypes.setLocationAddress,
      hideGeocoder: newLocationsActionTypes.hideGeocoder,
      showAddLocationModal: newLocationsActionTypes.showAddLocationModal,
      setLocationMarker: newLocationsActionTypes.setLocationMarker
    }),
    ...mapActions(locationsNamespace, {
      getLocations: locationsActionTypes.getLocations
    }),
    initializeMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ3JlZ29yaW9mIiwiYSI6ImNqcndlaDl1ZzBieXc0YW8za2V1a3J6Z3cifQ.aU-G3eL1QTwDakRsDc63dQ";
      const map = new mapboxgl.Map({
        center: this.center,
        zoom: this.zoom,
        container: "map-container",
        style: this.mapStyle
      });
      this.map = map;
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: "Ingrese la direccion",
        bbox: this.bbox,
        mapboxgl: mapboxgl
      });
      this.geocoder = geocoder;
      geocoder.on("result", ({ result }) => {
        this.setLocationAddress(result);
      });
      document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
      this.map.addControl(new mapboxgl.NavigationControl());
    },
    addMarker({
      name,
      Description,
      geolocation,
      currentVisitors,
      capacity,
      images
    }) {
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      const position = [geolocation.latitude, geolocation.longitude];
      const marker = new mapboxgl.Marker().setLngLat(position).addTo(this.map);
      const markerDiv = marker.getElement();

      markerDiv.addEventListener("mouseenter", () => {
        let html = `
        <h4>${name}</h4>
        <h5>${currentVisitors}/${capacity}</h5>
        <p>${Description}</p>
        `;
        (images || []).forEach(image => (html += `<img src=${image}/>`));
        popup
          .setLngLat(position)
          .setHTML(html)
          .addTo(this.map);
      });

      markerDiv.addEventListener("mouseleave", () => {
        this.map.getCanvas().style.cursor = "";
        popup.remove();
      });
      return marker;
    },
    onConfirmation() {
      this.hideGeocoder();
      this.showAddLocationModal();
    }
  }
};
</script>

<style scoped>
.mapbox-map {
  display: flex;
  margin: auto;
  height: 400px;
  width: 100%;
}
#container-div {
  display: flex;
  justify-content: center;
}
</style>
