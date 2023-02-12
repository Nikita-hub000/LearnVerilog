import { createRouter, createWebHistory } from "vue-router";
import Main from '@/views/Main.vue';
import Study from '@/views/Study.vue';
import Profile from '@/views/Profile.vue';
import Password from '@/views/password/_id.vue';
import Chat from '@/views/chat/_id.vue';
import store from '@/store'
import auth from "@/middleware/auth";
import setJwt from '@/middleware/setJwt'
import middlewarePipeline from '../middleware/pipeline'
import password from "@/middleware/password";
const routes = [
  {
    path: "/study",
    name: "StudyPage",
    component: Study,
    meta: {
      middleware: [setJwt, auth]
    }
  },
  {
    path: "/",
    name: "MainPage",
    component: Main,
    meta: {
      middleware: [setJwt]
    }
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: Profile,
    meta: {
      middleware: [setJwt, auth]
    }
  },
  {
    path: "/password/:id",
    name: "RecoveryVue",
    component: Password,
    meta: {
      middleware: [password]
    }
  },
  {
    path: "/chat/:id",
    name: "ChatVue",
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware
  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })
})

export default router;
