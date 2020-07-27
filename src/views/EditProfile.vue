<template>
  <div id="sign-up-form">
    <input type="text" placeholder="Name" v-model="$v.name.$model" />
    <div class="error" v-if="!$v.name.required">Field is required</div>
    <input type="text" placeholder="Email" v-model="$v.email.$model" />
    <div class="error" v-if="!$v.email.required">Field is required</div>
    <input type="password" placeholder="password" v-model="$v.password.$model" />
    <div class="error" v-if="!$v.password.required">Field is required</div>
    <button @click="handleSubmit">Update</button>
    <Loader>{{statusMessage}}</Loader>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Loader from "../components/Loader";
import callAPI from "../util/callAPI";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      statusMessage: "",
    };
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
    name: {
      required,
    },
  },
  methods: {
    async handleSubmit() {
      const { email, password, name } = this;
      const { username, userId } = this.$store.state;
      if (this.$v.$invalid) {
        this.statusMessage = "Please enter a valid value";
      } else {
        const body = JSON.stringify({
          username,
          id: userId,
          email,
          password,
          name,
        });
        const response = await callAPI(
          `/users/${username}`,
          "PUT",
          this.$store.state.token,
          body
        );
        setTimeout(() => {
          if (response.status === 200) {
            this.statusMessage = "Updated";
          } else {
            this.statusMessage = "Failed";
          }
        }, 500);
      }
    },
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

.error {
  /* border: 1px solid red; */
  color: red;
  width: 85%;
  margin: 0 auto;
  padding: 2px;
  box-sizing: border-box;
}
</style>