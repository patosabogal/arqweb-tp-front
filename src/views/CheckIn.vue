<template>
  <qrcode-stream @decode="onDecode"></qrcode-stream>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { checkIn } from "@/api/users";
import { mapState, mapActions } from "vuex";
import {
  actionTypes as userActionTypes,
  namespace as userNameSpace
} from "@/store/modules/user";
export default {
  computed: {
    ...mapState({
      userId: state => state.user.id,
      userCheckedIn: state => state.user.checkedIn
    })
  },
  components: {
    QrcodeStream
  },
  methods: {
    ...mapActions(userNameSpace, {
      getCheckedIn: userActionTypes.getCheckedIn
    }),
    async onDecode(qr) {
      try {
        const { locationId } = JSON.parse(qr);
        await checkIn(this.userId, locationId);
        this.getCheckedIn();
        this.$bvToast.toast(`CheckIn Existoso!`, {
          title: "Bien papu!",
          autoHideDelay: 5000,
          appendToast: true,
          variant: "success"
        });
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
        this.$bvToast.toast(
          `Algo malió sal :(!
        ${error}
        `,
          {
            title: "Wups",
            autoHideDelay: 5000,
            appendToast: true,
            variant: "danger"
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
</style>
