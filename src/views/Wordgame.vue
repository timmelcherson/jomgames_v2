<template>
  <div class="container">
    <div class="flip-card" v-on:click="rotateCard">
      <div :id="cardId" class="flip-card-inner">
        <div class="flip-card-front" :style="{ backgroundColor: '#F67a33' }">
          <p v-text="'VISA ORD'" class="card-title" />

          <div class="card-wordgame">
            <p class="card-wordgame-text" v-text="'VAD GÖR'" :style="{ fontSize: '12px' }" />
            <p class="card-wordgame-text" v-text="'DU?'" />
          </div>
        </div>
        <div class="flip-card-back" :style="{ backgroundColor: '#F67a33' }">
          <p v-text="currentWord" class="rajnd-question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Wordgame",
  data() {
    return {
      cardId: "wordgame-card",
      currentIndex: null,
      currentWord: "",
      rotated: false,
      rotationFinished: true,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.wordgameModule.isLoading,
      words: (state) => state.wordgameModule.words,
    }),
  },
  watch: {
    words: {
      deep: true,
      handler() {
        if (this.words.length > 1) {
          this.randomizeWord();
        }
      },
    },
  },
  created() {
    this.fetchWords();
  },
  methods: {
    ...mapActions(["fetchWords"]),
    rotateCard() {
      var element = document.getElementById(this.cardId);
      if (element) {
        element.classList.toggle("rotate");
        this.rotationFinished = false;
        this.rotated = !this.rotated;
        if (!this.rotated) {
          setTimeout(() => {
            this.randomizeWord();
            this.rotationFinished = true;
          }, 800);
        } else {
          setTimeout(() => {
            this.rotationFinished = true;
          }, 800);
        }
      }
    },
    randomizeWord() {
      if (this.words && this.words.length > 0) {
        var newIndex = Math.floor(Math.random() * this.words.length);
        this.currentIndex = newIndex;
        this.currentWord = this.words[this.currentIndex];
        this.showAnswer = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 40px;
  font-size: 20px;

  .flip-card {
    background-color: transparent;
    width: 600px;
    height: 400px;
    margin: 16px;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .rotate {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    color: black;
    font-family: "Orbitron", sans-serif;
    font-size: 30px;
  }

  .flip-card-front {
    background-color: #bbb;

    .card-wordgame {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;
      bottom: 0;
      right: 0;
      height: 30%;
      width: 30%;
      border-top-left-radius: 100% 100%;
      border-bottom-right-radius: 20px;
      background-color: white;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .card-wordgame-text {
        transform: rotate(-15deg);
        color: black;
        font-size: 40px;
        font-family: "Chicle", sans-serif;
        margin-bottom: 6px;
        margin-left: 12px;
      }
    }
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }
}
@media screen and (max-width: 768px) {
  .container {
    .flip-card {
      width: 500px;
      height: 360px;
    }
    .flip-card-front {
      .card-wordgame {
        .card-wordgame-text {
          font-size: 16px;
        }
      }
    }
  }
}
@media screen and (max-width: 400px) {
  .container {
    .flip-card {
      width: 300px;
      height: 220px;
    }
    .flip-card-front {
      .card-wordgame {
        .card-wordgame-text {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
