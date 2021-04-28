import * as fb from "@/firebase/firebaseRepository";

const actions = {
  async signInWithEmail({ commit }, data) {
    commit("IS_LOADING", true);

    await fb.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        commit("SET_ERROR_MSG", null);
        commit("SET_SIGNED_IN", true);
      })
      .catch((error) => {
        commit("SET_ERROR_MSG", error.message);
      });
    commit("IS_LOADING", false);
  },
  async signOut({ commit }) {
    fb.auth
      .signOut()
      .then(() => {
        commit("SET_SIGNED_IN", false);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default actions;
