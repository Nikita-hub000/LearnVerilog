<template>
  <div class="home">
    <p>AAAAA</p>
    <w-button @click="console()">PRESS ME</w-button>
  </div>
</template>

<script>
import store from "@/store";
export default {
  components: {},
  name: "GamePage",
  methods: {
    async console() {
      const result = await fetch("http://localhost:3000/user/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.state.accessToken}`
        },
      });
      const response = await result.json();
      console.log(response);
    }
  }

};
</script>