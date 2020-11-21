import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authModule from "./modules/auth";
import registrationModule from "./modules/registration";
import map, { namespace as mapNamespace } from "@/store/modules/map";
import user, { namespace as userNamespace } from "@/store/modules/user";
import newLocation, {
  namespace as newLocationNamespace
} from "@/store/modules/newLocation";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule, // TODO: cambiar por namespaces
    registrationModule, // TODO: cambiar por namespaces
    [mapNamespace]: map,
    [userNamespace]: user,
    [newLocationNamespace]: newLocation
  },
  plugins: [createPersistedState()]
});
