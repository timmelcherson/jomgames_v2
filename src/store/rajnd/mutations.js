const mutations = {
  IS_LOADING: (state, value) => {
    state.isLoading = value;
  },
  SET_RAJND_DATA: (state, data) => {
    state.rajndData = data;
  },
  SET_CATEGORIES: (state, data) => {
    state.categories = data;
  },
  SET_CURRENT_QUESTIONS: (state, payload) => {
    var index = state.currentQuestions.findIndex((current) => {
      return current.category === payload.category;
    });
    if (index >= 0) {
      state.currentQuestions[index].question = payload.question;
      state.currentQuestions[index].answer = payload.answer;
    } else {
      state.currentQuestions.push({
        category: payload.category,
        question: payload.question,
        answer: payload.answer,
      });
    }
  },
};

export default mutations;
