<template>
  <w-form v-model="valid" class="form">
    <h1>DOMINO</h1>
    <p>{{ isRegistration ? "Регистрация" : "Вход" }}</p>
    <w-input class="mt3 form__input" v-model="form.name" v-show="isRegistration" label="Имя"
      :validators="[validators.required]">
    </w-input>

    <w-input v-model="form.email" class="mt3 form__input" label="Почта" :validators="[validators.required]">
    </w-input>

    <w-input v-model="form.password" class="mt3 form__input" label="Пароль" type="password"
      :validators="[validators.required]">
    </w-input>
    <w-button @click="sign()" :disabled="valid === false" class="text-center form__button">
      Войти
    </w-button>
    <p class="form__link" @click="isRegistration = !isRegistration">
      {{ isRegistration ? "Вы уже смешарик?" : "Ты еще не смешарик..." }}
    </p>
    <w-transition-expand y>
      <w-alert v-if="showAlert" error>
        {{ alertText }}
      </w-alert>
    </w-transition-expand>
  </w-form>
</template>

<script>
import store from "@/store";
// import bcrypt from 'bcrypt';
export default {
  name: "AuthVue",
  data: () => ({
    valid: null,
    validators: {
      required: (value) => !!value || "This field is required",
    },
    form: {
      name: "",
      password: "",
      email: "",
    },
    isRegistration: false,
    showAlert: false,
    alertText: "",
  }),
  methods: {
    async sign() {
      if (this.isRegistration) {
        const result = await fetch("http://localhost:3000/user/registration", {
          method: "POST",
          body: JSON.stringify({
            email: this.form.email,
            password: this.form.password,
            username: this.form.name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          // }).then((res) => {
          //   if (res.status === 201) {
          //     store.commit("setInfo", {
          //       login: this.form.name,
          //       email: this.form.email,
          //     });
          //     this.$router.push("/game");
          //   } else if (res.status === 409) {
          //     this.showAlert = true;
          //     this.alertText = "Ало дядя, такой email уже есть!";
          //   } else {
          //     this.showAlert = true;
          //     this.alertText = "Что-то пошло не так:(";
          //   }
        });
        const response = await result.json();
        console.log(response);
        if (result.status === 201) {
          store.commit("setInfo", {
            login: response.data.name,
            accessToken: response.tokens.accessToken,
            email: response.data.email,
          });
          this.$router.push("/game");
        } else if (result.status === 409) {
          this.showAlert = true;
          this.alertText = "Ало дядя, такой email уже есть!";
        } else {
          this.showAlert = true;
          this.alertText = "Что-то пошло не так:(";
        }
        setTimeout(() => (this.showAlert = false), 5000);
        //   this.getInfo()
      } else {
        await this.signIn();
      }
    },
    async signIn() {
      const result = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      console.log(response)
      if (result.status === 200) {
        store.commit("setInfo", {
          accessToken: response.tokens.accessToken,
          login: response.data.username,
          email: response.data.email,
        });
        this.$router.push("/game");
      } else if (result.status === 404) {
        this.showAlert = true;
        this.alertText = "Мы не смогли найти пользователя с такими данными";
      } else {
        this.showAlert = true;
        this.alertText = "Что-то пошло не так:(";
        //   this.isSign = true;
        //   store.commit("notlogin");
      }
      setTimeout(() => (this.showAlert = false), 5000);
    },
  },
};

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
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
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

  &__link {
    margin-top: 20px;
    color: rgb(47, 207, 47);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>