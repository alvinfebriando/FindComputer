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
      <template v-if="this.items.length >= 1">
        <tr v-for="(v) in getItems" :key="v.id">
          <td>{{v.name}}</td>
          <td>{{v.description}}</td>
          <td>{{v.price}}</td>
          <td>{{v.owner.username}}</td>
          <td>
            <button @click="handleEdit(v.id)">Edit</button>
          </td>
          <td>
            <button @click="handleDelete(v.id)">Delete</button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="5">No data</td>
        </tr>
      </template>
    </tbody>
    <tbody v-else>
      <template v-if="this.items.length >= 1">
        <tr v-for="(v) in getItems" :key="v.id">
          <td>{{v.name}}</td>
          <td>{{v.description}}</td>
          <td>{{v.price}}</td>
          <td>{{v.owner.username}}</td>
          <td v-if="!v.self">
            <button @click="handleBuy(v.id)">Buy</button>
          </td>
          <td v-else>
            <button class="disabled" disabled="disabled">Buy</button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="5">No data</td>
        </tr>
      </template>
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
  methods: {
    async handleEdit(id) {
      this.$router.push(`/edit-item/${id}`);
    },
    async handleDelete(id) {
      await fetch(`${config.API_URL}${config.API_PREFIX}/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: this.$store.state.token,
          "Content-Type": "application/json",
        },
      });
      this.items = this.items.filter((i) => i.id !== id);
    },
    async handleBuy(id) {
      const response = await fetch(
        `${config.API_URL}${config.API_PREFIX}/items/${id}/${this.$store.state.username}`,
        {
          method: "POST",
          headers: {
            Authorization: this.$store.state.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: "",
            description: "",
            price: "",
            category: "",
            owner: JSON.stringify({
              username: this.$store.state.username,
            }),
          }),
        }
      );
      const data = await response.json();
      // console.log(data);
      this.items = this.items.map((i) => {
        if (i.id == data.id) {
          return data;
        } else {
          return i;
        }
      });
    },
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
.disabled {
  cursor: not-allowed;
}
</style>