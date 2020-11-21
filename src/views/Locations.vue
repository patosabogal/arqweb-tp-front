<template>
  <div>
    <h1 id="header">
      Tus Locaciones
      <new-location-modal />
    </h1>
    <Map />
  </div>
</template>
<script>
import Map from "@/components/mapbox/Map.vue";
import newLocationModal from "@/components/NewLocationModal.vue";
export default {
  name: "Locations",
  components: { Map, newLocationModal }
};
</script>

<style scoped>
#header {
  display: inline;
}
</style>
