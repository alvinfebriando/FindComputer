<template>
  <div id="sign-up-form">
    <input type="text" placeholder="username" v-model="username" />
    <input type="password" placeholder="password" v-model="password" />
    <button @click="handleSubmit">Sign in</button>
    <button @click="register">Register</button>
    <Loader>{{statusMessage}}</Loader>
  </div>
</template>

<script>
import config from "../config/config";
import Loader from "../components/Loader";
import callAPI from "../util/callAPI";

export default {
  components: {
    Loader: Loader,
  },
  data() {
    return {
      username: "",
      password: "",
      statusMessage: "",
    };
  },
  methods: {
    async fetchUserId(token) {
      const { username } = this;
      const response = await callAPI(`/users/${username}`, "GET", token);
      const data = await response.json();
      return data.id;
    },
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
      const userId = await this.fetchUserId(token);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ token, userId });
        }, 2000);
      });
    },
    async handleSubmit() {
      this.statusMessage = "Signing";
      const { token, userId } = await this.login();
      if (token) {
        this.statusMessage = "Success";
        setTimeout(() => {
          this.$store.commit("login", {
            token,
            username: this.username,
            userId,
          });
          this.$router.push("/");
        }, 500);
      } else {
        this.statusMessage = "Failed";
        this.username = "";
        this.password = "";
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
  created() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (token) {
      this.$store.commit("login", { token, username, userId });
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
