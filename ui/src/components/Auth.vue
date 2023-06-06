<template>
  <w-form v-model="valid" class="form">
    <p class="form__title">{{ isRegistration ? "Регистрация" : "Вход" }}</p>
    <w-input v-model="formSignIn.email" v-show="!isRegistration" class="mb3 form__input" round outline label="Почта" :validators="[validators.required, validators.email]">
    </w-input>

    <w-input v-model="formSignIn.password" v-show="!isRegistration" class="mt3 form__input" round outline  label="Пароль" type="password"
      >
    </w-input>
    <w-input class="mt3 form__input" v-model="form.name" round outline v-show="isRegistration" label="Псевдоним"
      :validators="[validators.required]">
    </w-input>

    <w-input v-model="form.email" v-show="isRegistration" class="mb3 form__input" round outline label="Почта" :validators="[validators.required, validators.email]">
    </w-input>

    <w-input v-model="form.password" v-show="isRegistration" class="mt3 form__input" round outline  label="Пароль" type="password"
      :validators="[validators.required, validators.uniqe]">
    </w-input>
    <w-input v-model="form.passwordAgain" class="mt3 form__input" round outline label="Введите пароль еще раз" v-show="isRegistration" type="password"
      :validators="[validators.required, validators.uniqe, validators.match(_, form.password)]">
    </w-input>
    <w-button @click="sign()" :disabled="valid === false" class="text-center form__button link btn">
      {{ isRegistration ? 'Зарегистрироваться' : 'Войти' }}
    </w-button>
    <p class="form__link" @click="isRegistration = !isRegistration">
      {{ isRegistration ? "Уже есть аккаунт?" : "Еще нет аккаунта?" }}
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
export default {
  name: "AuthVue",
  emits: ['modalchange'],
  props: {
    isReg: Boolean
  },
  data: () => ({
    valid: null,
    validators: {
      required: (value) => !!value || "Это обязательное поле!",
      minLength: (value) => value.length >= 3 || "Минимальная длина должна быть 3",
      email: (value) => value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'Формат почты неверен',
      uniqe: (value) => value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])/g) || 'Пароль должен содержать хотя бы 1 уникальный символ и 1 цифру',
      match: (value, form) => value === form || 'Пароли не совпадают'
    },
    form: {
      name: "",
      password: "",
      passwordAgain: "",
      email: "",
    },
    formSignIn: {
      email: '',
      password: ''
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
          }).then((res) => {
            if (res.status === 201) {
              store.commit("setInfo", {
                login: this.form.name,
                email: this.form.email,
              });
            } else if (res.status === 409) {
              this.showAlert = true;
              this.alertText = "Пользователь с такой почтой уже существует";
            } else {
              this.showAlert = true;
              this.alertText = "Что-то пошло не так:(";
            }
        });
        if (result.status === 201) {
          const response = await result.json();
          localStorage.setItem('userInfo', JSON.stringify({
            name: response.data.username,
            accessToken: response.tokens.accessToken,
            email: response.data.email,
            id: response.data.id,
            grant: response.data.grant
          }))
          store.commit("setInfo", {
            id: response.data.id,
            login: response.data.username,
            accessToken: response.tokens.accessToken,
            email: response.data.email,
            grant: response.data.grant
          });
          this.$emit('userName', true)
          this.$emit('modalchange');
        } else if (result.status === 409) {
          this.showAlert = true;
          this.alertText = "Пользователь с такой почтой уже существует";
        } else {
          this.showAlert = true;
          this.alertText = "Что-то пошло не так:(";
        }
        setTimeout(() => (this.showAlert = false), 5000);
      } else {
        await this.signIn();
      }
    },
    async signIn() {
      const result = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: this.formSignIn.email,
          password: this.formSignIn.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (result.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify({
            id: response.data.id,
            name: response.data.username,
            accessToken: response.tokens.accessToken,
            email: response.data.email,
            grant: response.data.grant
        }))
        store.commit("setInfo", {
          id: response.data.id,
          accessToken: response.tokens.accessToken,
          login: response.data.username,
          email: response.data.email,
          grant: response.data.grant
        });
        this.$emit('modalchange');
      } else if (result.status === 404) {
        this.showAlert = true;
        this.alertText = "Мы не смогли найти пользователя с такими данными";
      } else {
        this.showAlert = true;
        this.alertText = "Что-то пошло не так";
      }
      setTimeout(() => (this.showAlert = false), 5000);
    },
  },
};

// "username": "Nikita",
// "password": "12345",
// "email": "test@mail.ru"
</script>

<style lang="scss" scoped>
.link {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
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
.error {
  color: red
}
.w-input {
  width: 200px !important;
}
.form {
  display: flex;
  font-family: 'Inter', sans-serif;
  font-weight: 100;
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
  border: 1px solid #000000;
  border-radius: 35px;
  padding: 20px;
  background-color: white;

  &__input {
    margin-top: 7px !important;
  }

  &__title {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
  }

  &__button {
    font-family: 'Inter', sans-serif !important;
    font-style: normal !important;
    font-weight: 400 !important;
    font-size: 20px !important;
    min-width: 130px !important;
    height: 50px !important;
    margin-top: 20px;
    padding: 10px 20px !important;
    background: #0077FF !important;
    border: 1px solid #0077FF !important;
    border-radius: 64px !important;
    color: white !important;

    cursor: pointer;
  }

  &__link {
    margin-top: 10px;
    color: #0077FF;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  .w-input--focused.w-input--floating-label .w-input__input-wrap--box .w-input__label--inside, .w-input--filled.w-input--floating-label .w-input__input-wrap--box .w-input__label--inside, .w-input--has-placeholder.w-input--floating-label .w-input__input-wrap--box .w-input__label--inside {
    transform: translateY(-210%) scale(.85) !important;
}
}
</style>