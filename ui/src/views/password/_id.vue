<template>
    <w-form v-model="valid" class="form">
      <p class="form__title">Восстановление пароля</p>
        <w-input v-model="password"  class="mt3 form__input" round outline  label="Пароль" type="password"
        :validators="[validators.required, validators.uniqe]">
        </w-input>
        <w-input v-model="passwordAgain" class="mt3 form__input" round outline label="Введите пароль еще раз" type="password"
        :validators="[validators.required, validators.uniqe, validators.match(_, password)]">
        </w-input>
  
      <w-button @click="recover()" :disabled="valid === false" class="text-center form__button">
        Восстановить
      </w-button>
      <w-transition-expand y>
        <w-alert v-if="showAlertSuccess" success>
          Письмо отправлено на ваш почтовый ящик
        </w-alert>
      </w-transition-expand>
      <w-transition-expand y>
        <w-alert v-if="showAlert" error>
        Что-то пошло не так!
        </w-alert>
      </w-transition-expand>
    </w-form>
  </template>
  
  <script>
  import store from '@/store';
  export default {
    name: "RecoveryVue",
    data: () => ({
      valid: null,
      validators: {
        required: (value) => !!value || "Это обязательное поле!",
        email: (value) => value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || 'Формат почты неверен',
        uniqe: (value) => value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])/g) || 'Пароль должен содержать хотя бы 1 уникальный символ и 1 цифру',
        match: (value, form) => value === form || 'Пароли не совпадают'
      },
      password: "",
      passwordAgain: "",
      showAlert: false,
      showAlertSuccess: false,
    }),
    methods: {
      async recover() {
          const result = await fetch("http://localhost:3000/user/recover", {
            method: "POST",
            body: JSON.stringify({
              email: this.email,
              id: JSON.parse(localStorage.getItem('userInfo') || '{}').id
            }),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${store.getters.getJWT}`
            },
            }).then((res) => {
              if (res.status === 201) {
                this.showAlertSuccess = true
              } else {
                this.showAlert = true;
              }
          });
          console.log(result)
          setTimeout(() => (this.showAlert = false), 7000);
          setTimeout(() => (this.showAlertSuccess = false), 7000);

      },
    },
  };
  
  // "username": "Nikita",
  // "password": "12345",
  // "email": "test@gmail.com"
  </script>
  
  <style lang="scss">
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