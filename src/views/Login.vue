<template>
  <div class="container">
    <login-box />
  </div>
</template>

<script>
import LoginBox from "@/components/login/LoginBox";
export default {
  name: "Login",
  components: { LoginBox }
};
</script>

<style scoped>
.container {
  padding: 5% 10%;
}
</style>
