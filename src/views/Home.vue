<template>
  <Content>
    <Items></Items>
  </Content>
</template>

<script>
// @ is an alias to /src
import Items from "../components/Items";
import Content from "../components/Content";

export default {
  name: "Home",
  components: {
    Items,
    Content,
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push("/login");
    }
  },
};
</script>
