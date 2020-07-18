<template>
  <div id="sign-up-form">
    <input type="text" placeholder="Name" v-model="name" />
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="handleSubmit">Register</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      name: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$store.commit("login");
      this.$router.push("/");
    }
  }
};
</script>

<style>
#sign-up-form {
  width: 50%;
  margin: 0 auto;
}

input {
  width: 80%;
  margin: 10px 0;
}

button {
  margin: 5px;
}
</style>