<template>
  <div id="sign-up-form">
    <input type="text" placeholder="email" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="handleSubmit">Sign in</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleSubmit() {
      alert(`${this.username} ${this.password}`);
    }
  }
};
</script>

<style>
#sign-up-form {
  width: 20%;
  margin: 0 auto;
}

input {
  width: 80%;
  margin: 10px 0;
}
</style>