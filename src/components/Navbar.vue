<template>
  <div class="navbar">
    <div>FindComputer</div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-around;
}

.nav-links {
  width: 30%;
  display: flex;
  justify-content: space-around;
}
</style>