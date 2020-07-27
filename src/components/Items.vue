<template>
  <table>
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Owner</th>
      <th v-if="this.owner" colspan="2">Action</th>
      <th v-else>Action</th>
    </thead>
    <tbody v-if="this.owner">
      <tr v-for="(v) in getItems" :key="v.id">
        <td>{{v.name}}</td>
        <td>{{v.description}}</td>
        <td>{{v.price}}</td>
        <td>{{v.owner.username}}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="(v) in getItems" :key="v.id">
        <td>{{v.name}}</td>
        <td>{{v.description}}</td>
        <td>{{v.price}}</td>
        <td>{{v.owner.username}}</td>
        <td v-if="!v.self">Buy</td>
        <td v-else>Can't buy</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import config from "../config/config";
export default {
  props: ["owner"],
  data() {
    return {
      items: [],
    };
  },
  computed: {
    getItems() {
      return this.items.map((i) => {
        if (i.owner.username === this.$store.state.username) {
          return { ...i, self: true };
        } else {
          return { ...i, self: false };
        }
      });
    },
  },
  async created() {
    if (this.owner) {
      const response = await fetch(
        `${config.API_URL}${config.API_PREFIX}/items?username=${this.owner}`,
        {
          headers: {
            Authorization: this.$store.state.token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      this.items = data;
    } else {
      const response = await fetch(
        `${config.API_URL}${config.API_PREFIX}/items`,
        {
          headers: {
            Authorization: this.$store.state.token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      this.items = data;
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
}
</style>