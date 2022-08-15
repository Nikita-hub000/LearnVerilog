import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "",
      email: "",
    };
  },
  getters: {},
  mutations: {
    setInfo(state, payload) {
      state.name = payload.login;
      state.email = payload.email;
    },
  },
});

export default store;
