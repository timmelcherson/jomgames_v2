import * as fb from "@/firebase/firebaseRepository";
import categories from "@/constants/categories";
import firebase from "firebase/app";

const actions = {
  async fetchRajndCategories({ commit }) {
    commit("IS_LOADING", true);
    var categories = [];
    fb.categoriesCollection
      .get()
      .then((categoriesResult) => {
        categoriesResult.forEach((doc) => {
          categories.push(doc.data());
        });
        commit("SET_CATEGORIES", categories);
      })
      .catch((error) => {
        console.log(error);
      });
    commit("IS_LOADING", false);
  },
  async getQuestionFromCategory({ commit }, category) {
    commit("IS_LOADING", true);

    const matchingCategory = categories.find((cat) => cat.name === category);
    const docId = matchingCategory.firebaseId;
    const categoryCollection = fb.categoriesCollection;

    var key = categoryCollection.doc().id;

    categoryCollection
      .doc(docId)
      .collection("questions")
      .where(firebase.firestore.FieldPath.documentId(), ">=", key)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.size > 0) {
          const data = snapshot.docs[0].data();
          commit("SET_CURRENT_QUESTIONS", {
            category: category,
            question: data.question,
            answer: data.answer,
          });
        } else {
          categoryCollection
            .where(firebase.firestore.FieldPath.documentId(), "<", key)
            .limit(1)
            .get()
            .then((snapshot) => {
              if (snapshot.size > 0) {
                const data = snapshot.docs[0].data();
                commit("SET_CURRENT_QUESTIONS", {
                  category: category,
                  question: data.question,
                  answer: data.answer,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    commit("IS_LOADING", false);
  },
};

export default actions;
