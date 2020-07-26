<template>
  <div class="loader">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style>
.loader {
  margin: 0 auto;
}
</style>