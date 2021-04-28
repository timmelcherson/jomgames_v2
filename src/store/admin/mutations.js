const mutations = {
  IS_LOADING: (state, value) => {
    state.isLoading = value;
  },
  SET_SIGNED_IN: (state, value) => {
    state.signedIn = value;
  },
  SET_ERROR_MSG: (state, msg) => {
    state.errorMsg = msg;
  },
};

export default mutations;
