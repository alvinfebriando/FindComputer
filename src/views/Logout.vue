<template>
  <h1>lol</h1>
</template>

<script>
export default {
  created() {
    this.$store.commit("logout");
    this.$router.push("/");
  }
};
</script>