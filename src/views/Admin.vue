<template>
  <div class="admin-container">
    <div v-if="!signedIn" class="back-btn">
      <router-link to="/" class="back-btn-link">
        <p class="back-btn-text">Tillbaka</p>
      </router-link>
    </div>
    <template v-if="signedIn">
      <admin-dashboard />
    </template>
    <template v-else>
      <admin-login />
    </template>
    <div v-if="signedIn && !isMobile" class="logout-btn" @click="signOut">
      <p class="logout-btn-text">Logga ut</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";

export default {
  name: "Admin",
  components: {
    AdminDashboard,
    AdminLogin,
  },
  computed: {
    ...mapState({
      signedIn: (state) => state.adminModule.signedIn,
    }),
  },
  data() {
    return {
      isMobile: window.innerWidth <= 768,
    };
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    ...mapActions(["signOut"]),
    resizeHandler() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: white;

  .back-btn {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 120px;
    padding: 10px;
    margin: 16px;
    background: none;
    border: 1px solid black;
    color: black;
    text-decoration: none;
    transition: all 0.3s;

    a:-webkit-any-link {
      color: black;
      cursor: pointer;
    }

    &:hover {
      cursor: pointer;
      background: black;
      color: white;

      a:-webkit-any-link {
        color: white;
      }
    }
    &:visited {
      color: black;
    }

    .back-btn-link {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      width: 100%;
      height: 100%;

      .back-btn-text {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        font-size: 20px;
        font-family: "Source Code Pro", sans-serif;
      }
    }
  }

  .logout-btn {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 120px;
    padding: 10px;
    margin: 16px;
    background: none;
    border: 1px solid #000000;
    color: black;
    transition: all 0.3s;

    &:hover {
      cursor: pointer;
      color: white;
      background: black;
    }

    .logout-btn-text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      font-size: 20px;
      font-family: "Source Code Pro", sans-serif;
      text-decoration: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .admin-container {
    justify-content: flex-start;
    flex-direction: column;

    .back-btn {
      position: relative;
      align-self: flex-start;
    }

    .logout-btn {
      position: relative;
      align-self: flex-end;
      height: 40px;
      width: 40px;

      .logout-btn-text {
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>
