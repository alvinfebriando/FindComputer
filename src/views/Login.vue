<template>
  <div id="sign-up-form">
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="handleSubmit">Sign in</button>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import config from "../config/config";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      const response = await fetch(`${config.API_URL}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const token = response.headers.get("Authorization");
      return token;
    },
    async handleSubmit() {
      const token = await this.login();
      if (token) {
        this.$store.commit("login", token);
        this.$router.push("/");
      } else {
        alert("failed");
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("login", token);
    }
    if (this.$store.state.isLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>

<style>
#sign-up-form {
  width: 40%;
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
