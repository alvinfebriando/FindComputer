<template>
  <div id="sign-up-form">
    <input type="text" placeholder="Name" v-model="name" />
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="handleSubmit">Register</button>
    <Loader>{{this.statusMessage}}</Loader>
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
      email: "",
      name: "",
      statusMessage: "",
    };
  },
  methods: {
    async register() {
      const { username, password, email, name } = this;
      const response = await fetch(
        `${config.API_URL}${config.API_PREFIX}/users`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            email,
            name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: response.status, message: data.message });
        }, 2000);
      });
    },
    async handleSubmit() {
      this.statusMessage = "Registering";
      const { status, message } = await this.register();
      if (status === 200) {
        this.statusMessage = "Success";
        setTimeout(() => {
          this.$router.push("/login");
        }, 500);
      } else {
        this.statusMessage = `Failed, ${message}`;
      }
    },
  },
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