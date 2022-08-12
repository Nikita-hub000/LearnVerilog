import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Game from '@/views/Game.vue';
// import About from '@/views/About.vue';
// import Account from '@/components/Account.vue'
// import Password from '@/components/Password.vue'
// import People from '@/components/People.vue'
// import Player from '@/components/Player.vue'
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/game",
    name: "GamePage",
    component: Game,
  },
  //   {
  //     path: '/about',
  //     name: 'About',
  //     component: About
  //   },
  //   {
  //       path: '/acc',
  //       name: 'Account',
  //       component: Account
  //   },
  //   {
  //     path: '/password/:id',
  //     component: Password
  //   },
  //   {
  //     path: '/people',
  //     component: People
  //   },
  //   {
  //     path: '/player/:id',
  //     component: Player
  //   },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
