<template>
  <div class="search">
    Search
    <br />
    <select name="category" v-model="category">
      <option value="RAM">RAM</option>
      <option value="PROCESSOR">Processor</option>
      <option value="VGA">VGA</option>
      <option value="MOTHERBOARD">Motherboard</option>
      <option value="STORAGE">Storage</option>
    </select>
    <br />
    <br />
    <Items :category="category"></Items>
  </div>
</template>

<script>
import Items from "../components/Items";
export default {
  components: {
    Items,
  },
  data() {
    return {
      category: "RAM",
    };
  },
};
</script>

<style>
.search {
  width: 50%;
  margin: 0 auto;
}
</style>