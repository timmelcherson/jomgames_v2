import * as fb from "@/firebase/firebaseRepository";

const actions = {
  async fetchWords({ commit }) {
    commit("IS_LOADING", true);

    var words = [];

    await fb.wordsCollection
      .get()
      .then((wordsResult) => {
        wordsResult.forEach((doc) => {
          words.push(doc.data().value);
        });
      })
      .catch((error) => console.log(error));

    commit("SET_WORDS", words);
    commit("IS_LOADING", false);
  },
};

export default actions;
