const user = {
  state: {
    token: ""
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    GET_TOKEN: ({ commit }, state) => {
      commit("SET_TOKEN", state);
    }
  }
};

export default user;
