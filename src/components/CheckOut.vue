<template>
  <b-button
    type="button"
    class="btn btn-lg btn-success large checkout "
    @click="onClick"
  >
    Check Out
  </b-button>
</template>

<script>
// @ is an alias to /src
import { checkOut } from "@/api/users";
import { mapState, mapActions } from "vuex";
import {
  actionTypes as userActionTypes,
  namespace as userNameSpace
} from "@/store/modules/user";

export default {
  name: "CheckOut",
  components: {},
  computed: {
    ...mapState({
      userCheckedIn: state => state[userNameSpace].checkedIn,
      userId: state => state[userNameSpace].id
    })
  },
  methods: {
    ...mapActions(userNameSpace, {
      getCheckedIn: userActionTypes.getCheckedIn
    }),
    async onClick() {
      try {
        await checkOut(this.userId);
        this.getCheckedIn();
      } catch (error) {
        console.log(error);
        this.$bvToast.toast(`Algo malió sal :(!`, {
          title: "Wups",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "danger"
        });
      }
    }
  }
};
</script>
<style scoped>
.checkout {
  display: inline-block;
  font-size: 75px;
  padding: 0;
  padding-top: 15px;
}
</style>
