<template>
  <div id="nav" v-if="this.$route.path !== '/admin'">
    <div class="home-link-wrapper">
      <span class="home-link-span">
        <router-link to="/" id="home-link" class="home-link-bg">
          <p class="link-text">Hem</p>
        </router-link>
      </span>
    </div>
    <div class="link-container">
      <span class="game-link-wrapper">
        <router-link to="/rajnd" class="link rajnd-link-bg">
          <p class="link-text">Du e Rajnd</p>
        </router-link>
      </span>
      <span class="game-link-wrapper">
        <router-link to="/wordgame" class="link wordgame-link-bg">
          <p class="link-text">Vad gör du?</p>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/colors.scss";

#nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 140px;
  text-transform: uppercase;

  .home-link-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    top: 0;
    width: 100%;
    border-bottom-left-radius: 300px;
    border-bottom-right-radius: 300px;
    background: #181e24;

    .home-link-span {
      z-index: 3;
      width: 220px;
      height: 120px;
      border-bottom-left-radius: 300px;
      border-bottom-right-radius: 300px;
      background: #181e24;
      transition: all 0.3s;

      &:hover {
        background: #424242;
        cursor: pointer;
      }

      .home-link-bg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-bottom-left-radius: 300px;
        border-bottom-right-radius: 300px;
        border-bottom: 1px solid white;

        &.router-link-exact-active {
          background: #a1ffc8;
        }

        #home-link {
          color: white;
          text-transform: uppercase;
          text-align: center;
        }
      }
    }
  }

  .link-container {
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
    height: 140px;

    .game-link-wrapper {
      display: flex;
      flex: 1;
      height: 100%;
      transition: all 0.3s;
      border-bottom: 1px solid white;

      &:hover {
        cursor: pointer;
        background: #424242;
      }

      .link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        &.router-link-active {
          background: rgba($color: #a1e4ff, $alpha: 0.6);
        }
        &.rajnd-link-bg {
          border-right: 1px solid white;
        }
        &.wordgame-link-bg {
          border-left: 1px solid white;
        }

        .link-text {
          color: white;
          opacity: 1;
          margin-bottom: 0;
        }
      }
    }
  }

  a {
    text-decoration: none;
    color: white;
    font-family: "Orbitron", sans-serif;
  }
}

@media screen and (max-width: 768px) {
  #nav {
    font-size: 14px;

    .home-link-wrapper {
      .home-link-span {
        width: 120px;
        height: 60px;
      }
    }

    .link-container {
      .game-link-wrapper {
        .link {
          align-items: flex-end;

          .link-text {
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
