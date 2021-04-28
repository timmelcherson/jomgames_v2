const mutations = {
  IS_LOADING: (state, value) => {
    state.isLoading = value;
  },
  SET_CURRENT_CATEGORY: (state, categoryId) => {
    state.currentCategoryId = categoryId;
  },
  SET_QUESTIONS: (state, questions) => {
    state.questions = null;
    state.questions = questions;
  },
  SET_WORDS: (state, words) => {
    state.words = null;
    state.words = words;
  },
};

export default mutations;
