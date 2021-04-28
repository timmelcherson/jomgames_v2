function state() {
  return {
    isLoading: false,
    categories: [],
    currentQuestions: [],
    rajndData: [
      {
        category: "",
        backgroundColor: "",
        questions: [
          {
            question: "",
            answer: "",
          },
        ],
      },
    ],
  };
}

export default state;
