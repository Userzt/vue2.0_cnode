<template>
  <div id="app" v-cloak>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
[v-cloak]{
  display: none;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
body {
  background-color: #e1e1e1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .container {
    width: 1400px;
    margin: 20px auto;

    .content {
      background-color: #fff;
    }
  }
}
</style>