import { getLocations, getHealthStatus, getCheckedIn } from "@/api/users";
// initial state
const state = () => ({
  id: null,
  locations: [],
  healthStatus: "",
  checkedIn: false
});

// getters
const getters = {
  getStatus: ({ healthStatus }) => {
    const mappedStatus = { value: healthStatus };
    switch (healthStatus) {
      case "onRisk":
        mappedStatus.text = "🔥En peligro!🔥";
        break;
      case "positiveCovid":
        mappedStatus.text = "💀Positivo💀";
        break;
      default:
        mappedStatus.text = "🌈Fuera de peligro🌈";
    }
    return mappedStatus;
  }
};

export const namespace = "user";

export const actionTypes = {
  setUser: "SET_USER",
  getLocations: "GET_LOCATIONS",
  getCheckedIn: "GET_CHECKED_IN",
  getHealthStatus: "GET_HEALTH_STATUS"
};

const mutationTypes = {
  setCheckedIn: "SET_CHECKED_IN",
  setLocations: "SET_LOCATIONS",
  setId: "SET_ID",
  setUsername: "SET_USERNAME",
  setHealthStatus: "SET_HEALTH_STATUS"
};

// actions
const actions = {
  [actionTypes.setUser]: async ({ commit }, user) => {
    commit(mutationTypes.setId, user.id);
    commit(mutationTypes.setUsername, user.username);
  },
  [actionTypes.getLocations]: async ({ state, commit }) => {
    const locations = await getLocations(state.id);
    commit(mutationTypes.setLocations, locations);
  },
  [actionTypes.getCheckedIn]: async ({ state, commit }) => {
    const status = await getCheckedIn(state.id);
    commit(mutationTypes.setCheckedIn, status);
  },
  [actionTypes.getHealthStatus]: async ({ state, commit }) => {
    const status = await getHealthStatus(state.id);
    commit(mutationTypes.setHealthStatus, status);
  },
  [actionTypes.setCheckedIn]: ({ commit }, payload) =>
    commit(mutationTypes.setCheckedIn, payload)
};

// mutations
const mutations = {
  [mutationTypes.setId]: (state, newId) => (state.id = newId),
  [mutationTypes.setUsername]: (state, username) => (state.username = username),
  [mutationTypes.setHealthStatus]: (state, status) =>
    (state.healthStatus = status),
  [mutationTypes.setCheckedIn]: (state, payload) => (state.checkedIn = payload),
  [mutationTypes.setLocations]: (state, payload) => (state.locations = payload)
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
