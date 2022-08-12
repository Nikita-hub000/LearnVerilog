import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      name: '',
      email: '',
    };
  },
  getters: {},
  mutations: {
    setInfo(state, login, gmail){
        state.name = login
        state.email = gmail
    },
  },
});

export default store