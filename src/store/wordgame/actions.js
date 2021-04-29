import * as fb from "@/firebase/firebaseRepository";

const actions = {
  async fetchWords({ commit }) {
    console.log("fetcing words...");
    commit("IS_LOADING", true);

    var words = [];

    await fb.wordsCollection
      .get()
      .then((wordsResult) => {
        wordsResult.forEach((doc) => {
          words.push(doc.data().value);
        });
        console.log("commiting: ");
        console.log(words);
        commit("SET_WORDS", words);
      })
      .catch((error) => console.log(error));

    commit("IS_LOADING", false);
  },
};

export default actions;
