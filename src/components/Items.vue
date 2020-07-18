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
      <tr v-for="(v, i) in items" :key="i">
        <td>{{v.name}}</td>
        <td>{{v.description}}</td>
        <td>{{v.price}}</td>
        <td>{{v.owner}}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="(v, i) in items" :key="i">
        <td>{{v.name}}</td>
        <td>{{v.description}}</td>
        <td>{{v.price}}</td>
        <td>{{v.owner}}</td>
        <td>Buy</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["owner"],
  data() {
    return {
      items: [
        { name: "nA", description: "dA", price: 1, owner: "oA" },
        { name: "nB", description: "dB", price: 2, owner: "oB" }
      ]
    };
  },
  created() {
    if (this.owner) {
      // alert(this.owner);
    } else {
      // alert(null);
    }
  }
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