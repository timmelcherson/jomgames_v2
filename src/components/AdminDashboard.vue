<template>
  <div class="dashboard-container">
    <div v-if="isMobile" class="menu-btn" @click="showMenu = true">
      <span class="menu-btn-line" />
      <span class="menu-btn-line" />
      <span class="menu-btn-line" />
    </div>
    <dashboard-nav
      :showMenu="showMenu"
      @navCallback="navCallbackHandler"
      @closeMenu="showMenu = false"
    />

    <add-questions-and-words v-if="navIndex === 0" />
    <edit-rajnd-data v-else-if="navIndex === 1" />
    <edit-wordgame-data v-else-if="navIndex === 2" />
  </div>
</template>

<script>
import AddQuestionsAndWords from "@/components/AddQuestionsAndWords";
import DashboardNav from "@/components/DashboardNav";
import EditRajndData from "@/components/EditRajndData.vue";
import EditWordgameData from "@/components/EditWordgameData.vue";

export default {
  components: {
    AddQuestionsAndWords,
    DashboardNav,
    EditRajndData,
    EditWordgameData,
  },
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      showMenu: false,
      navIndex: 0,
    };
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    navCallbackHandler(index) {
      this.navIndex = index;
      if (this.isMobile && this.showMenu) {
        this.showMenu = false;
      }
    },
    resizeHandler() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  .menu-btn {
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    flex-direction: column;
    z-index: 3;
    width: 34px;
    height: 20px;
    padding: 4px;
    margin: 10px;

    .menu-btn-line {
      width: 100%;
      height: 2px;
      background: black;
    }
  }
}

@media screen and (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }
}
</style>
