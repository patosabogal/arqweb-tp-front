import Vue from "vue";
import { register } from "@/api/login";

export const REGISTRATION_ACTION = {
  REGISTER: "REGISTRATION_REGISTER"
};
export const REGISTRATION_STATE = {
  ERROR: "error",
  LOADING: "loading",
  SUCCESS: "success"
};

const REGISTRATION_MUTATIONS = {
  REQUEST: "REGISTRATION_REQUEST",
  SUCCESS: "REGISTRATION_SUCCESS",
  ERROR: "REGISTRATION_ERROR"
};

const state = {
  status: "",
  message: ""
};

const getters = {
  registrationStatus: state => state.status,
  registrationMessage: state => state.message
};

const actions = {
  [REGISTRATION_ACTION.REGISTER]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      let { username, email, password } = user;

      commit(REGISTRATION_MUTATIONS.REQUEST);
      register(username, email, password)
        .then(resp => {
          commit(REGISTRATION_MUTATIONS.SUCCESS, resp);
          resolve(resp);
        })
        .catch(err => {
          commit(REGISTRATION_MUTATIONS.ERROR, err);
          reject(err);
        });
    });
  }
};

const mutations = {
  REGISTRATION_REQUEST: state => {
    state.status = REGISTRATION_STATE.LOADING;
    state.message = "";
  },
  REGISTRATION_SUCCESS: (state, resp) => {
    state.status = REGISTRATION_STATE.SUCCESS;
    state.user = resp.data;
    Vue.notify({
      group: "system_msg",
      title: "El usuario se registró exitosamente",
      text: ""
    });
  },
  REGISTRATION_ERROR: (state, err) => {
    state.status = REGISTRATION_STATE.ERROR;
    if (err.response.status == 400) {
      Vue.notify({
        group: "system_msg",
        title: err.toString(),
        text: err.response.data.message,
        type: "error"
      });

      return;
    }
    state.message = err.response.data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
