<template>
  <Content>
    <router-link to="/add-item" class="btn-link">Add item</router-link>
    <router-link to="/edit-profile" class="btn-link">Edit Profile</router-link>
    <Profile :username="this.$store.state.username" :name="this.name" :email="this.email"></Profile>
    <Items :owner="this.$store.state.username"></Items>
  </Content>
</template>

<script>
import callAPI from "../util/callAPI";
import Items from "../components/Items";
import Content from "../components/Content";
import Profile from "../components/Profile";

export default {
  components: {
    Items,
    Content,
    Profile,
  },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  async created() {
    const username = this.$store.state.username;
    const response = await callAPI(
      `/users/${username}`,
      "GET",
      this.$store.state.token
    );
    const data = await response.json();
    this.name = data.name;
    this.email = data.email;
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