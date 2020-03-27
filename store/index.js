export default {
  state() {
    return {
	token: '',
  };
}, 
actions: {
  },
  mutations: {
    setToken(state, value) {
        state.token = value;
      }
    },
};
