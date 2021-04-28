<template>
  <transition name="slide-fade">
    <section v-if="showMenu || !isMobile" class="dashboard-nav">
      <div class="dashboard-title-row">
        <h3 class="dashboard-nav-title" v-text="'Jomgames Admin'" />
        <img
          v-if="isMobile"
          src="@/assets/icons/close.png"
          class="close-menu-btn"
          @click="closeMenu"
        />
      </div>
      <div class="dashboard-nav-item border-top" @click="navChangeHandler(0)">Lägg till nytt</div>
      <div class="dashboard-nav-item" @click="navChangeHandler(1)">Frågor till 'Du e rajnd'</div>
      <div class="dashboard-nav-item" @click="navChangeHandler(2)">Ord till 'Vad gör du?'</div>

      <div v-if="signedIn && isMobile" class="logout-btn" @click="signOut">
        <p class="logout-btn-text">Sign out</p>
      </div>
    </section>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    showMenu: {
      type: Boolean,
      value: false,
    },
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
    navChangeHandler(index) {
      this.$emit("navCallback", index);
    },
    resizeHandler() {
      this.isMobile = window.innerWidth <= 768;
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-nav {
  position: relative;
  width: 320px;
  min-width: 320px;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  align-self: flex-start;
  background: white;
  border-right: 2px solid black;

  .dashboard-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .dashboard-nav-title {
      padding: 30px 20px;
      font-family: "Source Code Pro", sans-serif;
      font-size: 24px;
      color: black;
    }

    .close-menu-btn {
      height: 30px;
      width: 30px;
      object-fit: contain;
      padding: 2px;
      margin: 10px;
    }
  }

  .dashboard-nav-item {
    padding: 30px 20px;
    font-family: "Source Code Pro", sans-serif;
    font-size: 18px;
    border-bottom: 2px solid black;
    transition: all 0.3s;

    &.border-top {
      border-top: 2px solid black;
    }

    &:hover {
      cursor: pointer;
      background: rgba($color: #91ecce, $alpha: 0.3);
    }
  }

  .logout-btn {
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
  .dashboard-nav {
    justify-content: flex-start;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    padding-top: 10px;
  }
}
</style>
