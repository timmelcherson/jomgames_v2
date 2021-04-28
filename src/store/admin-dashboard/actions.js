import * as fb from "@/firebase/firebaseRepository";

const actions = {
  async getQuestionsFromCategory({ commit, state }, categoryId) {
    commit("IS_LOADING", true);

    if (categoryId !== state.currentCategoryId) {
      var questions = [];
      fb.categoriesCollection
        .doc(categoryId)
        .collection("questions")
        .get()
        .then((snapshot) => {
          if (snapshot.size > 0) {
            snapshot.docs.forEach((item) => {
              questions.push({
                id: item.id,
                question: item.data().question,
                answer: item.data().answer,
              });
            });
            commit("SET_QUESTIONS", questions);
            commit("SET_CURRENT_CATEGORY", categoryId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("no need to get questions again");
    }
    commit("IS_LOADING", false);
  },
  async getWords({ commit }) {
    commit("IS_LOADING", true);

    var words = [];

    await fb.wordsCollection
      .get()
      .then((snapshot) => {
        if (snapshot.size > 0) {
          snapshot.docs.forEach((item) => {
            words.push({
              id: item.id,
              value: item.data().value,
            });
          });
          commit("SET_WORDS", words);
        }
      })
      .catch((error) => console.log(error));

    commit("IS_LOADING", false);
  },
  async addRajndQuestion({ commit }, payload) {
    commit("IS_LOADING", true);
    var result;
    await fb.categoriesCollection
      .doc(payload.categoryId)
      .collection("questions")
      .doc()
      .set({
        question: payload.question,
        answer: payload.answer,
      })
      .then(() => {
        result = {
          success: true,
          msg: "Ny rajnd-fråga har lagts till",
        };
      })
      .catch((error) => {
        result = {
          success: false,
          msg: "Ny rajnd-fråga kunde inte läggas till, något gick fel " + error.message,
        };
      });
    commit("IS_LOADING", false);
    return result;
  },
  async addWord({ commit }, word) {
    commit("IS_LOADING", true);
    var result;
    await fb.wordsCollection
      .doc()
      .set({
        value: word,
      })
      .then(() => {
        result = {
          success: true,
          msg: "Nytt ord till 'Vad gör du' har lagts till",
        };
      })
      .catch((error) => {
        result = {
          success: false,
          msg: "Nytt ord kunde inte läggas till, något gick fel" + error.message,
        };
      });
    commit("IS_LOADING", false);
    return result;
  },
  async updateRajndQuestion({ commit }, payload) {
    commit("IS_LOADING", true);

    fb.categoriesCollection
      .doc(payload.categoryId)
      .collection("questions")
      .doc(payload.data.id)
      .set({
        question: payload.data.question,
        answer: payload.data.answer,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    commit("IS_LOADING", false);
  },
  async deleteRajndQuestion({ commit, state }, payload) {
    commit("IS_LOADING", true);
    fb.categoriesCollection
      .doc(payload.categoryId)
      .collection("questions")
      .doc(payload.questionId)
      .delete()
      .then(() => {
        commit(
          "SET_QUESTIONS",
          state.questions.filter((item) => item.id !== payload.questionId)
        );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    commit("IS_LOADING", false);
  },
  async updateWord({ commit }, payload) {
    commit("IS_LOADING", true);
    fb.wordsCollection
      .doc(payload.id)
      .set({
        value: payload.value,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    commit("IS_LOADING", false);
  },
  async deleteWord({ commit, state }, wordId) {
    commit("IS_LOADING", true);
    fb.wordsCollection
      .doc(wordId)
      .delete()
      .then(() => {
        commit(
          "SET_WORDS",
          state.words.filter((item) => item.id !== wordId)
        );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    commit("IS_LOADING", false);
  },
};

export default actions;
