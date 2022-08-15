import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: "",
      email: "",
      accessToken: "",
    };
  },
  getters: {},
  mutations: {
    setInfo(state, payload) {
      state.accessToken = payload.accessToken;
      state.name = payload.login;
      state.email = payload.email;
    },
  },
});

export default store;
