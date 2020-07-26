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
import config from "../config/config";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      name: "",
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
      return response.status;
    },
    async handleSubmit() {
      const status = await this.register();
      if (status === 200) {
        this.$router.push("/login");
      } else {
        alert("Something went wrong");
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