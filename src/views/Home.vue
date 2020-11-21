<template>
  <div class="home container">
    <h1>{{ status.text }}</h1>
    <div>
      <check-out v-if="userCheckedIn" />
      <b-button
        type="button"
        to="checkin"
        :class="[buttonClass, userCheckedIn ? largeClass : hugeClass]"
      >
        Check In
      </b-button>
    </div>
    <div />
    <b-button to="report" type="button" class="btn btn-danger huge contagio">
      Reportar
    </b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import CheckOut from "@/components/CheckOut.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import {
  actionTypes as userActionTypes,
  namespace as userNameSpace
} from "@/store/modules/user";

export default {
  name: "Home",
  components: { CheckOut },
  data: function() {
    return {
      buttonClass: "btn btn-lg btn-info checkin",
      largeClass: "large checkin-large",
      hugeClass: "huge checkin-huge"
    };
  },
  async beforeMount() {
    await this.getCheckedIn();
    await this.getHealthStatus();
  },
  computed: {
    ...mapGetters(userNameSpace, {
      status: "getStatus"
    }),
    ...mapState({
      userCheckedIn: state => state.user.checkedIn
    })
  },
  methods: {
    ...mapActions(userNameSpace, {
      getCheckedIn: userActionTypes.getCheckedIn,
      getHealthStatus: userActionTypes.getHealthStatus
    })
  }
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
}
.checkin-large {
  display: inline-block;
  font-size: 80px;
}
.checkin-huge {
  display: inline-block;
  font-size: 120px;
}
.contagio {
  font-size: 120px;
}
</style>
