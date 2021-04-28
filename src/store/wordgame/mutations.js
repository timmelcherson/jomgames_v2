const mutations = {
  IS_LOADING: (state, value) => {
    state.isLoading = value;
  },
  SET_WORDS: (state, data) => {
    state.words = data;
  },
};

export default mutations;
