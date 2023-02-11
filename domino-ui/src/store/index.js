import { createStore } from "vuex";

const store = createStore({
  state: {
      id: '',
      name: "",
      email: "",
      accessToken: "",
    },
  getters: {
    getUserInfo(state) {
      return {name: state.name, email: state.email, id: state.id}
    },
    getJWT(state) {
      return state.accessToken
    }
  },
  mutations: {
    setInfo(state, payload) {
      state.accessToken = payload.accessToken;
      state.name = payload.login;
      state.email = payload.email;
      state.id = payload.id
    },
  },
});

export default store;
