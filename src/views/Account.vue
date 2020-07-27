<template>
  <Content>
    <router-link to="/add-item" class="btn-link">Add item</router-link>
    <router-link to="/edit-profile" class="btn-link">Edit Profile</router-link>
    <Items owner="self"></Items>
  </Content>
</template>

<script>
import Items from "../components/Items";
import Content from "../components/Content";
export default {
  components: {
    Items,
    Content,
  },
};
</script>

<style scoped>
.btn-link {
  padding: 10px;
  display: inline-block;
  margin: 10px;
  color: green;
}
</style>