<template>
<w-form v-model="valid" class="form">
  <h1>DOMINO</h1>
  <p>Вход</p>
  <w-input
    class="mt3 form__input"
    v-model="form.name"
    label="Имя"
    :validators="[validators.required]">
  </w-input>

  <w-input
    v-model="form.email"
    class="mt3 form__input"
    label="Почта"
    :validators="[validators.required]">
  </w-input>

  <w-input
    v-model="form.password"
    class="mt3 form__input"
    label="Пароль"
    :validators="[validators.required]">
  </w-input>
    <w-button @click="sign()" :disabled="valid === false" class="text-center form__button">
      Войти
    </w-button>

</w-form>

</template>

<script>
// import bcrypt from 'bcrypt'
export default {
    name: 'AuthVue',
    data: () => ({
    valid: null,
    validators: {
        required: value => !!value || 'This field is required'
    },
    form: {
        name: '',
        password: '',
        email: ''
    }
    }),
    methods: {
      async sign() {
        // bcrypt.hash(this.form.password, 10, (err, hash) => {
        // if (err) {
        //     console.error(err)
        //     return
        // }
        // console.log(hash)
      let result = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          console.log("okay");
        //   store.commit("login");
        //   store.commit("showName", {
        //     login: this.userLog.name,
        //     password: this.userLog.password,
        //     email: this.userLog.email,
        //   });
        //   this.$router.push("/about");
        //   this.isSign = false;
        } else {
          console.log("no");
        //   this.isSign = true;
        //   store.commit("notlogin");
        }
      });
    //   this.getInfo()
      await result;
    },
    },
}

    // "username": "Nikita",
    // "password": "12345",
    // "email": "test@gmail.com"
</script>

<style lang="scss">
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    align-self: center;
    justify-self: center;
    flex-direction: column;
    width: 400px;
    border: 1px solid rgb(157, 255, 157);
    border-radius: 10px;
    padding: 20px;

    &__input {
        width: 200px;
    }

    &__button {
        width: 100px;
        margin-top: 20px;
    }
}
</style>