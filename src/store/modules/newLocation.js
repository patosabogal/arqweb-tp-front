// initial state
const state = () => ({
  addLocationModalVisibility: false,
  geocoderVisibility: false,
  locationAddress: {
    place_name: null
  }
});

// getters
const getters = {};

export const namespace = "newLocation";

export const actionTypes = {
  showAddLocationModal: "SHOW_ADD_LOCATION_MODAL",
  hideAddLocationModal: "HIDE_ADD_LOCATION_MODAL",
  showGeocoder: "SHOW_GEOCODER",
  hideGeocoder: "HIDE_GEOCODER",
  setLocationAddress: "SET_LOCATION_ADDRESS",
  resetLocationAddress: "RESET_LOCATION_ADDRESS"
};

const mutationTypes = {
  setAddLocationModalVisibility: "SET_ADD_LOCATION_MODAL_VISIBILITY",
  setGeocoderVisibility: "SET_GEOCODER",
  setLocationAddress: "SET_LOCATION_ADDRESSS"
};

// actions
const actions = {
  [actionTypes.showAddLocationModal]: async ({ commit }) => {
    commit(mutationTypes.setAddLocationModalVisibility, true);
  },
  [actionTypes.hideAddLocationModal]: ({ commit }) => {
    commit(mutationTypes.setAddLocationModalVisibility, false);
  },
  [actionTypes.showGeocoder]: ({ commit }) => {
    commit(mutationTypes.setGeocoderVisibility, true);
  },
  [actionTypes.hideGeocoder]: ({ commit }) => {
    commit(mutationTypes.setGeocoderVisibility, false);
  },
  [actionTypes.setLocationAddress]: ({ commit }, payload) => {
    commit(mutationTypes.setLocationAddress, payload);
  },
  [actionTypes.resetLocationAddress]: ({ commit }) => {
    commit(mutationTypes.setLocationAddress, { place_name: null });
  }
};

// mutations
const mutations = {
  [mutationTypes.setAddLocationModalVisibility]: (state, visibility) =>
    (state.addLocationModalVisibility = visibility),
  [mutationTypes.setGeocoderVisibility]: (state, visibility) =>
    (state.geocoderVisibility = visibility),
  [mutationTypes.setLocationAddress]: (state, payload) =>
    (state.locationAddress = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
