<template>
<w-toolbar class="nav-container">
<div class="nav-box">
  <router-link class="link-title" to="/">LearnVerilog</router-link>
  <router-link active-class="link-active" class="link" to="/study">Учиться</router-link>
  <router-link active-class="link-active" class="link" to="/my">Статистика</router-link>
  <router-link active-class="link-active" class="link" to="/">О нас</router-link>
</div>
<div v-if="!isAccount" class="nav-box">
  <button @click="openModalExample" class="link btn">Вход</button>
  <button @click="openReg" class="link btn">Регистрация</button>
</div>
<div v-if="isAccount" class="nav-box">
  <router-link active-class="link-active" to="/profile">
    <img src="../assets/img/profile.png" class="nav-icon"/>
  </router-link>
</div>
</w-toolbar>
<vue-final-modal v-model="showModal" name="example">
<AuthVue :is-reg="true" v-on:modalchange="close"/>
</vue-final-modal>
<vue-final-modal v-model="showModalReg" name="example1">
<AuthVue :is-reg="false" v-on:modalchange="close" />
</vue-final-modal>
</template>

<script>
import { $vfm, VueFinalModal  } from 'vue-final-modal'
import AuthVue from './Auth.vue'

export default {
    name: "HeaderComponent",
    components: {
    VueFinalModal,
    AuthVue
    },
    data: () => ({
    showModal: false,
    showModalReg: false,
    isAccount: !!JSON.parse(localStorage.getItem('userInfo') || '{}').accessToken,
    }),
    methods: {
    openModalExample() {
      $vfm.hideAll()
      $vfm.show('example')
    }, 
    openReg() {
      $vfm.hideAll()
      $vfm.show('example1')
    },
    close() {
      $vfm.hideAll()
      this.isAccount = true
    },
    },
}

</script>
<style lang="scss" scoped>
.popup {
  position: absolute;
  left: 30%;
  right: 30%;
  top: 30%;
  display: flex;
  width: 500px;
  height: 400px;
  background: white;
  font-weight: 700;
  font-family: 'InterBold', serif;
  border: 1px solid #000000;
  border-radius: 64px;
  align-items: center;
  justify-content: center;
}
.link {
  font-family: 'Inter', sans-serif;
  font-weight: 100;
  line-height: 4px;
  text-decoration: none;
  color: #000000;
  margin-right: 17px;
  font-size: 18px;
  line-height: 20px;

  &:last-of-type {
    margin-right: 0;
  }

  &-active {
    color: #9D9D9D;
  }
  &-title {
    font-weight: 700;
    font-family: 'InterBold', serif;
    color: #000000;
    font-size: 18px;
    line-height: 20px;
    margin-right: 17px;
  }
}

.btn {
  background: #FFFFFF;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 5px 20px 5px;
}

.nav {
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  &-box {
    align-items: baseline;
    display: flex;
    flex-direction: row;
  }

  &-container {
    position: sticky;   
    top: 0; 
    width: 98%;
    justify-content: space-between;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
    max-height: 50px;
    padding-top: 20px;
    border-bottom: 1px solid black;
  }

  &-icon {
    width: 45px;
    height: 45px;
    margin-top: 22px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
}
</style>