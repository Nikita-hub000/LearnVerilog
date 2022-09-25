<template>
  <div class="home">
    <AuthVue />
  </div>
</template>

<script>
import AuthVue from '@/components/Auth.vue';
export default {
  components: { AuthVue },
  name: "HomePage",
};
</script>