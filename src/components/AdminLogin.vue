<template>
  <div class="login-container">
    <h1 class="login-title">Inloggning Admin</h1>
    <form class="login-form" @submit.prevent="submitHandler">
      <input v-model="email" placeholder="email" class="text-input" />
      <input v-model="password" type="password" placeholder="password" class="text-input" />

      <button type="submit" class="login-btn">Logga in</button>
    </form>
    <p v-if="errorMsg !== null" class="error-message" v-text="errorMsg" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AdminLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      errorMsg: (state) => state.adminModule.errorMsg,
    }),
  },
  methods: {
    ...mapActions(["signInWithEmail"]),
    submitHandler() {
      this.signInWithEmail({
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  background: white;
  border-radius: 10px;

  .login-title {
    font-size: 24px;
    margin: 8px;
    font-family: "Source Code Pro", sans-serif;
    color: black;
  }

  .login-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 300px;

    .login-btn {
      width: 100%;
      padding: 20px;
      margin: 20px;
      background: none;
      border: 2px solid black;
      color: black;
      font-family: "Source Code Pro", sans-serif;
      font-size: 20px;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        color: white;
        background: black;
      }
    }
  }

  .error-message {
    color: rgb(255, 130, 130);
    font-family: "Source Code Pro", sans-serif;
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .login-container {
    padding: 10px;
  }
}
</style>
