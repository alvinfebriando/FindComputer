<template>
  <div class="profile">
    <div>
      <span>Name</span>
      <span>{{this.name}}</span>
    </div>
    <div>
      <span>Username</span>
      <span>{{this.username}}</span>
    </div>
    <div>
      <span>Email</span>
      <span>{{this.email}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "username", "email"],
};
</script>

<style>
.profile {
  width: 50%;
  margin: 10px auto;
}

.profile div {
  display: flex;
  justify-content: space-around;
}
</style>