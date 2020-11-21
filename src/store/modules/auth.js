import Vue from "vue";
import { login, logout } from "@/api/login";
import {
  actionTypes as userActionTypes,
  namespace as userNamespace
} from "@/store/modules/user";

export const AUTH_ACTION = {
  LOGIN: "AUTH_LOGIN",
  LOGOUT: "AUTH_LOGOUT"
};
export const AUTH_STATE = {
  ERROR: "error",
  LOADING: "loading",
  SUCCESS: "success"
};

const AUTH_MUTATIONS = {
  REQUEST: "AUTH_REQUEST",
  SUCCESS: "AUTH_SUCCESS",
  ERROR: "AUTH_ERROR",
  LOGOUT: "AUTH_LOGOUT"
};

const state = {
  status: "",
  message: ""
};

const getters = {
  isAuthenticated: state => state.status == AUTH_STATE.SUCCESS,
  authStatus: state => state.status,
  authMessage: state => state.message,
  currentUser: state => state.user
};

const actions = {
  [AUTH_ACTION.LOGIN]: ({ commit, dispatch }, credentials) => {
    return new Promise((resolve, reject) => {
      let { username, password } = credentials;

      commit(AUTH_MUTATIONS.REQUEST);
      login(username, password)
        .then(resp => {
          commit(AUTH_MUTATIONS.SUCCESS);
          dispatch(`${userNamespace}/${userActionTypes.setUser}`, resp);
          dispatch(`${userNamespace}/${userActionTypes.getHealthStatus}`);
          dispatch(`${userNamespace}/${userActionTypes.getCheckedIn}`);
          resolve(resp);
        })
        .catch(err => {
          console.log(err);
          commit(AUTH_MUTATIONS.ERROR, err);
          reject(err);
        });
    });
  },
  [AUTH_ACTION.LOGOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      logout()
        .then(resp => {
          commit(AUTH_MUTATIONS.LOGOUT);
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const mutations = {
  AUTH_REQUEST: state => {
    state.status = AUTH_STATE.LOADING;
    state.message = "";
  },
  AUTH_SUCCESS: state => {
    state.status = AUTH_STATE.SUCCESS;
  },
  AUTH_ERROR: (state, err) => {
    state.status = AUTH_STATE.ERROR;
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
  },
  AUTH_LOGOUT: state => {
    state.status = "";
    state.user = {};
    state.message = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
