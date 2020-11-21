<template>
  <div id="container">
    <b-button
      id="button"
      class="tn  btn-circle btn-sm"
      @click="showAddModal"
      v-if="!geocoderVisibility"
    >
      <b-icon
        icon="plus-circle-fill"
        variant="success"
        font-scale="2.5"
      ></b-icon>
    </b-button>
    <b-modal
      id="modal-1"
      title="Agregar nueva locación"
      :visible="addModalVisibility"
      @close="onClose"
      hide-footer
    >
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Descripcion:"
          label-for="input-2"
        >
          <b-form-textarea
            id="input-2"
            v-model="form.description"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-3" label="Capacidad:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.capacity"
            min="1"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Locacion:" label-for="input-3">
          <div id="input-group-4">
            <b-button class="btn-small btn-info" @click="onSelectLocation"
              >Seleccionar</b-button
            >
            <b-form-input
              id="input-4"
              tabindex="-1"
              required
              v-model="locationAddress.place_name"
            ></b-form-input>
          </div>
        </b-form-group>

        <b-button id="submit" type="submit" variant="primary" @submit="onClose"
          >Registrar</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import EventHub from "@/eventHub.js";
import { addNewLocation } from "@/api/users";
import {
  actionTypes as newLocationActionTypes,
  namespace as newLocationNamespace
} from "@/store/modules/newLocation";
import {
  actionTypes as usersActionTypes,
  namespace as usersNamespace
} from "@/store/modules/user";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        name: null,
        description: null,
        capacity: null
      }
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      addModalVisibility: state =>
        state[newLocationNamespace].addLocationModalVisibility,
      geocoderVisibility: state =>
        state[newLocationNamespace].geocoderVisibility,
      locationAddress: state => state[newLocationNamespace].locationAddress
    })
  },
  methods: {
    ...mapActions(newLocationNamespace, {
      showAddModal: newLocationActionTypes.showAddLocationModal,
      hideAddModal: newLocationActionTypes.hideAddLocationModal,
      showGeocoder: newLocationActionTypes.showGeocoder,
      resetLocationAddress: newLocationActionTypes.resetLocationAddress
    }),
    ...mapActions(usersNamespace, {
      getLocations: usersActionTypes.getLocations
    }),
    async onSubmit(event) {
      EventHub.$emit("CLEAR_GEOCODER");
      event.preventDefault();
      try {
        await addNewLocation(
          this.userId,
          this.form.name,
          this.form.description,
          parseInt(this.form.capacity),
          this.locationAddress.center
        );
        this.getLocations();
      } catch (error) {
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
      EventHub.$emit("RECENTER_MAP");
      this.onClose();
    },
    onSelectLocation() {
      this.hideAddModal();
      this.showGeocoder();
    },
    onClose() {
      EventHub.$emit("CLEAR_GEOCODER");
      this.hideAddModal();
      this.form = {
        name: null,
        description: null,
        capacity: null
      };
      this.resetLocationAddress();
    }
  }
};
</script>
>
<style scoped>
#container {
  display: inline;
}
#button {
  background: none;
  border: none;
  float: right;
}
#input-group-4 {
  display: flex;
}
#input-4 {
  pointer-events: none;
  background-color: #e9ecef;
  opacity: 1;
}
#submit {
  float: right;
}
</style>
