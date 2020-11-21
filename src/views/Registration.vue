<template>
  <div class="container">
    <registration-form />
  </div>
</template>

<script>
import RegistrationForm from "@/components/registration/RegistrationForm";
export default {
  name: "Registration",
  components: { RegistrationForm }
};
</script>

<style scoped>
.container {
  padding: 5% 10%;
}
</style>
