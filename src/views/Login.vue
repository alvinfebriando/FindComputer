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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ token });
        }, 2000);
      });
    },
    async handleSubmit() {
      this.statusMessage = "Signing";
      const { token } = await this.login();
      if (token) {
        this.statusMessage = "Success";
        setTimeout(() => {
          this.$store.commit("login", {
            token,
            username: this.username,
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
    if (token) {
      this.$store.commit("login", { token, username });
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
