<template>
  <div id="registration_container">
    <h5 class="title">Nuevo Usuario</h5>
    <form>
      <input
        required
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Usuario"
      />
      <input
        required
        v-model="email"
        type="email"
        class="form-control"
        placeholder="Email"
      />
      <input
        required
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Contraseña"
      />
      <p class="error-msg" v-if="registrationFailed">
        {{ getRegistrationMessage() }}
      </p>
    </form>
    <button type="submit" class="btn btn-primary btn-block" @click="register">
      Registrar
    </button>
    <button
      type="submit"
      class="btn btn-secondary btn-block"
      @click="redirectLoginPage"
    >
      Volver
    </button>
  </div>
</template>

<script>
// import {REGISTRATION_ACTION} from "@/store/modules/registration";

import {
  REGISTRATION_ACTION,
  REGISTRATION_STATE
} from "@/store/modules/registration";

export default {
  name: "RegistrationForm",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register: function() {
      const { username, email, password } = this;
      this.$store
        .dispatch(REGISTRATION_ACTION.REGISTER, { username, email, password })
        .then(this.redirectLoginPage)
        .catch(() => {});
    },
    registrationFailed: function() {
      return (
        this.$store.getters.registrationStatus === REGISTRATION_STATE.ERROR
      );
    },
    getRegistrationMessage: function() {
      return this.$store.getters.registrationMessage;
    },
    redirectLoginPage: function() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped>
#registration_container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 22rem;
  border-radius: 1px;
  background-color: white;
  padding: 3%;
}

#registration_container form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 22px 0px;
}

#registration_container .title {
  text-align: left;
}
</style>
