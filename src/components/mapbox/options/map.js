export const options = {
  center: {
    type: Array,
    default: () => [-58.55549114685999, -34.66450851130576]
  },
  zoom: {
    type: Number,
    default: 9
  },
  minZoom: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: 22
  },
  bbox: {
    type: Array,
    default: () => [-59.787567, -35.519099, -57.776453, -33.915678]
  },
  mapStyle: {
    type: [String, Object],
    default: () => "mapbox://styles/mapbox/bright-v9"
  }
};
