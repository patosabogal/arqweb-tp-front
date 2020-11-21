<template>
  <b-button @click="logout">Cerrar sesión</b-button>
</template>

<script>
import { AUTH_ACTION } from "@/store/modules/auth";

export default {
  name: "LogoutButton",
  components: {},
  methods: {
    logout: function() {
      this.$store
        .dispatch(AUTH_ACTION.LOGOUT)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped></style>
