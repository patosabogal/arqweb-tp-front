<template>
  <div id="app">
    <notifications group="system_msg" position="bottom right" />
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand
        ><b-button :class="logoClass" to="/" pill variant="outline-none">
          <img
            alt="#YoEstuveLogo"
            src="./assets/logo_v1.png"
            width="50"
            height="50"
          /> </b-button
      ></b-navbar-brand>

      <h2 id="greeting_label" v-if="isAuthenticated">
        <strong>{{ username }}</strong>
      </h2>
      <b-navbar-toggle v-if="isAuthenticated" target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="list"></b-icon>
          <b-icon v-else icon="list"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="locations">Locations</b-nav-item>
        </b-navbar-nav>
        <logout-button />
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
import LogoutButton from "@/components/navbar/LogoutButton";
import { mapGetters, mapState } from "vuex";

export default {
  components: { LogoutButton },
  data: function() {
    return {
      logoClass: "no-padding-no-margin"
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState({
      username: state => state.user.username
    })
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.no-padding-no-margin {
  padding: 0 !important;
  margin: 0 !important;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.huge {
  margin: 40px;
  width: 600px;
  height: 180px;
}
.large {
  margin: 40px;
  width: 400px;
  height: 120px;
}

#greeting_label {
  color: white;
  margin: 0 auto;
  font-weight: 500;
}
</style>
