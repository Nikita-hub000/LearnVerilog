<template>
  <div class="box">
    <div id="nav" v-if="!isLoginPage">
      <router-link class="link" to="/">Home</router-link> |
      <router-link class="link" to="/">Home</router-link>
      <!-- <router-link
        class="link"
        :class="{ disabled: $store.state.isEnter }"
        to="/people"
        ></router-link
      > -->
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoginPage: true,
    };
  },
  mounted() {
    this.isLoginPage = this.$router.currentRoute.value.fullPath === "/";
  },
  updated() {
    this.isLoginPage = this.$router.currentRoute.value.fullPath === "/";
  },
};
</script>

<style>
html {
  height: 100%;
}

#app {
  height: 100%;
}

body {
  height: 100%;
}

.link {
  text-decoration: none;
  color: teal;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
