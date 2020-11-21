<template>
  <div id="login_container">
    <b-overlay :show="isLoading()" rounded="sm">
      <h5 class="title">Logueate en tu cuenta</h5>
      <div class="credentials">
        <input
          required
          v-model="username"
          type="email"
          class="form-control"
          placeholder="Usuario"
        />
        <input
          required
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Contraseña"
        />
      </div>
      <p class="forgot-pwd">Olvidaste tu contraseña?</p>
      <p class="error-msg" v-if="authFailed">{{ getAuthMessage() }}</p>
      <button type="submit" class="btn btn-primary btn-block" @click="login">
        Ingresar
      </button>
      <button
        type="submit"
        class="btn btn-secondary btn-block"
        @click="redirectRegistrationPage"
      >
        Registrarse
      </button>
    </b-overlay>
  </div>
</template>

<script>
import { AUTH_STATE } from "@/store/modules/auth";
import { AUTH_ACTION } from "@/store/modules/auth";
export default {
  name: "LoginBox",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    isLoading: function() {
      return this.$store.getters.authStatus === AUTH_STATE.LOADING;
    },
    authFailed: function() {
      return this.$store.getters.authStatus === AUTH_STATE.ERROR;
    },
    getAuthMessage: function() {
      return this.$store.getters.authMessage;
    },
    login: function() {
      const { username, password } = this;
      this.$store
        .dispatch(AUTH_ACTION.LOGIN, { username, password })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    },
    redirectRegistrationPage: function() {
      this.$router.push({ name: "Registration" });
    }
  }
};
</script>

<style scoped>
#login_container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 22rem;
  border-radius: 1px;
  background-color: white;
  padding: 3%;
  border-radius: 17px;
  border: 2px solid lightgrey;
}

#login_container .credentials {
  gap: 10px;
  display: flex;
  flex-direction: column;
}

#login_container .title {
  text-align: left;
}

#login_container .forgot-pwd {
  align-self: flex-end;
  font-size: smaller;
  color: royalblue;
  margin-top: 2%;
}

#login_container .error-msg {
  color: orangered;
  font-family: system-ui;
  text-align: left;
  font-size: 0.9rem;
}
</style>
