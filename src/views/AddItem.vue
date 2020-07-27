<template>
  <div id="sign-up-form">
    <input type="text" placeholder="Name" v-model.trim="$v.name.$model" />
    <div class="error" v-if="!$v.name.required">Field is required</div>
    <input type="text" placeholder="Description" v-model="$v.description.$model" />
    <div class="error" v-if="!$v.description.required">Field is required</div>
    <input type="number" min="0" placeholder="Price" v-model="$v.price.$model" />
    <div class="error" v-if="!$v.price.required">Field is required</div>
    <div class="error" v-if="!$v.price.minValue">Minimum value is 0</div>
    <select name="category" v-model="category">
      <option value="NONE">Category</option>
      <option value="RAM">RAM</option>
      <option value="PROCESSOR">Processor</option>
      <option value="VGA">VGA</option>
      <option value="MOTHERBOARD">Motherboard</option>
      <option value="STORAGE">Storage</option>
    </select>
    <div class="error" v-if="!$v.category.validateCategory">Please choose category</div>

    <br />
    <button @click="handleSubmit">Add</button>
    <Loader>{{statusMessage}}</Loader>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import Loader from "../components/Loader";
import callAPI from "../util/callAPI";
const validateCategory = (value) => value !== "NONE";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      name: "",
      description: "",
      price: "",
      category: "NONE",
      statusMessage: "",
    };
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
    price: {
      required,
      minValue: minValue(0),
    },
    category: { validateCategory },
  },
  methods: {
    async add() {
      const { name, description, price, category } = this;
      if (this.$v.$invalid) {
        this.statusMessage = "Please enter a valid value";
      } else {
        this.statusMessage = "Adding";
        const body = JSON.stringify({
          name,
          description,
          price,
          category,
          owner: {
            username: this.$store.state.username,
          },
        });
        const response = await callAPI(
          `/items`,
          "POST",
          this.$store.state.token,
          body
        );
        setTimeout(() => {
          if (response.status === 200) {
            this.statusMessage = "Added";
          } else {
            this.statusMessage = "Failed";
          }
        }, 500);
      }
    },
    async handleSubmit() {
      await this.add();
    },
  },
};
</script>

<style scoped>
#sign-up-form {
  width: 40%;
  margin: 0 auto;
}

input {
  width: 80%;
  margin: 10px 0;
}

select {
  width: 80%;
}

.error {
  /* border: 1px solid red; */
  color: red;
  width: 85%;
  margin: 0 auto;
  padding: 2px;
  box-sizing: border-box;
}

button {
  margin: 10px;
}
</style>
