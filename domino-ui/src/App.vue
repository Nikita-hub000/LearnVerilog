<template>
    <header-component />
    <router-view class="content" />
    <footer-component class="footer" />
</template>

<script>
import '@/font/font.scss'
import HeaderComponent from '@/components/Header.vue'
import FooterComponent from '@/components/Footer.vue'
export default {
  name: "App",
  components: {
    HeaderComponent, FooterComponent
  },
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
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
/* html {
  min-height: 100vh;
} */

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.content {
  flex: 1 0 auto;
}
.footer {
  flex: 0 0 auto;
}


/* body {
  min-height: 100vh;
  overflow: auto;
} */
/* body > footer {
  position: sticky;
  top: 100vh;
} */

</style>
