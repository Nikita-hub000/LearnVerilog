<template>
    <div>
    <section>
        <h2 class="profile__header">Мой профиль</h2>
        <p class="profile__text">Ваш ID: {{ id }}</p>
        <p class="profile__text">Псевдоним: Nikita</p>
        <p class="profile__text">Почта: nikita.lapshin2000@gmail.com</p>
        <p class="profile__link" @click="openModalExample">Сменить пароль?</p>
    </section>
    <section>
        <h2 class="profile__header">Моя статистика</h2>
        <p class="profile__text">Среднее число неправильных попыток на задание: 3.43</p>
        <p class="profile__text">Количество пройденных заданий: 20</p>
        <p class="profile__text">Средняя активность за месяц: 5 заданий в день</p>
        <p class="profile__text">Дата регистрации: 10.10.2022</p>
        <p class="profile__text">Дата последнего решенного задания: 14.10.2022</p>
    </section>
    <section>
        <h2 class="profile__header">Мои друзья</h2>
        <w-form class="profile__find">
            <w-input v-model="userId" class="mb3 form__input" round outline label="Введите ID пользователя"></w-input>
            <w-button class="profile__button-find" @click="findUser" color="primary" round outline xl>Найти</w-button>
        </w-form>
        <div v-if="!!find.userName" class="profile__underline">
        <div class="profile__card profile__card-find">
                <p class="profile__text-card">Псевдоним: {{ find.userName }}</p>
                <p class="profile__text-card">Дата регистрации: 10.10.2022</p>
                <p class="profile__text-card">Дата последнего решенного задания: 14.10.2022</p>
                <button class="profile__button" v-if="requestStatus" disabled>Запрос отправлен</button>
                <button class="profile__button" v-else @click="addFriend">Добавить в друзья</button>
        </div>
        </div>
        <div class="profile__friends">
            <div class="profile__card">
                <p class="profile__text-card">Псевдоним: Nikita</p>
                <p class="profile__text-card">Дата регистрации: 10.10.2022</p>
                <p class="profile__text-card">Дата последнего решенного задания: 14.10.2022</p>
                <p class="profile__text-card">Вы начали дружить с Nikita 12.10.2022!</p>
                <button class="profile__button">Начать чат</button>
            </div>
            <div class="profile__card">
                <p class="profile__text-card">Псевдоним: Nikita</p>
                <p class="profile__text-card">Дата регистрации: 10.10.2022</p>
                <p class="profile__text-card">Дата последнего решенного задания: 14.10.2022</p>
                <p class="profile__text-card">Вы начали дружить с Nikita 12.10.2022!</p>
                <button class="profile__button">Начать чат</button>
            </div>
            <div class="profile__card">
                <p class="profile__text-card">Псевдоним: Nikita</p>
                <p class="profile__text-card">Дата регистрации: 10.10.2022</p>
                <p class="profile__text-card">Дата последнего решенного задания: 14.10.2022</p>
                <p class="profile__text-card">Вы начали дружить с Nikita 12.10.2022!</p>
                <button class="profile__button">Начать чат</button>
            </div>
        </div>
    </section>
</div>
<vue-final-modal v-model="showModalPassword" name="password">
<PasswordVue />
</vue-final-modal>
</template>

<script>
import store from "@/store";
import { $vfm, VueFinalModal  } from 'vue-final-modal'
import PasswordVue from '@/components/Password.vue'
export default {
    name: "ProfilePage",
    components: {
    VueFinalModal,
    PasswordVue
    },
    data: () => ({
        isActive: true,
        showModalPassword: false, 
        id: store.getters.getUserInfo.id,
        friends: [],
        responses: [],
        userId: '',
        requests: [],
        find: {
            userName: '',
            userId: ''
        },
        requestStatus: false
    }),
    methods: {
     openModalExample() {
      $vfm.hideAll()
      $vfm.show('password')
    },
    async check() {
       const result = await fetch("http://localhost:3000/friend/check", {
        method: "POST",
        body: JSON.stringify({
          from: this.id,
          to: this.find.userId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      console.log(response)
      this.requestStatus = !!response.message
      if (result.status !== 200) {
        this.showAlert = true;
        this.alertText = "Мы не смогли найти пользователя с такими данными";
      }
      setTimeout(() => (this.showAlert = false), 5000);
    },
    async addFriend() {
        const result = await fetch("http://localhost:3000/friend/add", {
        method: "POST",
        body: JSON.stringify({
          from: this.id,
          to: this.find.userId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      console.log(response)
      this.requestStatus = !!response.message
      if (result.status !== 200) {
        this.showAlert = true;
        this.alertText = "Мы не смогли найти пользователя с такими данными";
      }
      setTimeout(() => (this.showAlert = false), 5000);
    },
    async findUser() {
        const result = await fetch("http://localhost:3000/user/details", {
        method: "POST",
        body: JSON.stringify({
          id: this.userId
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      console.log(response)
      if (result.status === 200) {
        this.find.userName = response.data.username
        this.find.userId = response.data.id
      } else {
        this.showAlert = true;
        this.alertText = "Мы не смогли найти пользователя с такими данными";
      }
      await this.check()
      setTimeout(() => (this.showAlert = false), 5000);
    }
    },
    async mounted() {
        const result = await fetch("http://localhost:3000/friend/initFriends", {
        method: "POST",
        body: JSON.stringify({
          id: store.getters.getUserInfo.id
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      console.log(response)
      if (result.status === 200) {
        this.friends = []
        this.requests = []
        this.responses = []
        this.friends = response.friends.userData.friends
        this.requests = response.friends.userData.requests
        this.responses = response.friends.userData.responses
      } else {
        this.showAlert = true;
        this.alertText = "Что-то пошло не так";
      }
      setTimeout(() => (this.showAlert = false), 5000);
    }
}
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        flex-direction: column;
        padding-left: 150px;
        &:last-of-type {
            padding-bottom: 20px;
        }
    }
    .profile {
        &__header {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 35px;
            line-height: 42px;
            color: #000000;
            margin-top: 22px;
            margin-bottom: 0;
        }
        &__text {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            margin-top: 25px;
            margin-bottom: 0;
            &-card {
                font-family: 'Inter', sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                margin-bottom: 10px;
            }
        }
        &__link {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            color: #0077FF;
            margin-top: 10px;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
        &__friends {
            display: grid;
            column-gap: 20px;
            row-gap: 20px;
            grid-template-columns: 250px 250px 250px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        &__card {
            display: flex;
            flex-direction: column;
            width: 200px;
            height: 200px;
            padding: 20px;
            margin-top: 10px;
            border: 1px solid #008800;
            border-radius: 10px;
            &-find {
                height: 165px;
            }
        }
        &__button {
            background: #008800;
            border-radius: 10px;
            padding: 8px 20px;
            color: white;
            border: 1px solid #008800;
            &:hover {
                background: #199519;
                border: 1px solid #199519;
                cursor: pointer;
            }
            &-find {
                margin-left: 13px !important;
                margin-top: 18px !important;
            }
        }
        &__find {
            // width: 300px;
            // height: 20px;
            display: flex;
            flex-direction: row;
            margin-top: 3px;
            margin-bottom: 10px;
            // padding-left: 5px;
            // padding-top: 5px;
            // padding-bottom: 5px;
            // border: 1px solid #008800;
            // border-radius: 10px;
        }
        &__underline {
            width: 80%;
            border-bottom: 1px solid black;
            padding-bottom: 20px;
        }
    }
    .w-input {
        max-width: 300px !important;
    }
</style>