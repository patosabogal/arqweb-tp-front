<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Informanos del resultado"
        label-for="input-1"
      >
        <b-form-select
          :style="{
            display: 'block !important',
            width: '75%',
            margin: 'auto'
          }"
          block="true"
          width="20x"
          size="lg"
          :options="options"
          id="select"
          font-size="400px"
          v-model="form.result"
          locale="es"
          class="big-ass-font"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              Seleccione el resultado
            </b-form-select-option>
          </template>
        </b-form-select>
        <b-form-datepicker
          :style="{
            display: 'block !important',
            width: '75%',
            margin: 'auto'
          }"
          label-no-date-selected="Seleccione una fecha."
          block="true"
          width="20x"
          size="lg"
          value-as-date
          id="datepicker"
          font-size="400px"
          v-model="form.date"
          locale="es"
          class="big-ass-font"
        ></b-form-datepicker>
      </b-form-group>

      <b-button
        type="submit"
        class="large big-ass-font2"
        :disabled="!form.result || !form.date"
        variant="danger"
        >Reportar</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { reportTest } from "@/api/users";
import { mapState, mapActions } from "vuex";
import {
  namespace as userNamespace,
  actionTypes as userActionTypes
} from "@/store/modules/user";
export default {
  computed: {
    ...mapState({
      userId: state => state.user.id
    })
  },
  data() {
    return {
      form: {
        result: null,
        date: null
      },
      options: [
        { value: "positivo", text: "Positivo" },
        { value: "negativo", text: "Negativo" }
      ]
    };
  },
  methods: {
    ...mapActions(userNamespace, {
      getHealthStatus: userActionTypes.getHealthStatus
    }),
    async onSubmit(event) {
      event.preventDefault();
      await reportTest(this.userId, this.form.result, this.form.date);
      await this.getHealthStatus();
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style scoped>
#select {
  text-align: center;
}
#input-group-1 {
  font-size: 80px;
}
.big-ass-font {
  font-size: 40px;
}
.big-ass-font2 {
  font-size: 80px;
}
</style>
