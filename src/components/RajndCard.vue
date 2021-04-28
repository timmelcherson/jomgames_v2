<template>
  <div class="flip-card" @click="rotateCard">
    <div :id="cardId" class="flip-card-inner">
      <div class="flip-card-front" :style="{ backgroundColor: backgroundColor }">
        <p v-text="category" class="card-title" />

        <div class="card-rajnd">
          <p class="card-rajnd-text" v-text="'DU E'" :style="{ fontSize: '12px' }" />
          <p class="card-rajnd-text" v-text="'RAJND'" />
        </div>
      </div>
      <div class="flip-card-back" :style="{ backgroundColor: backgroundColor }">
        <p v-text="currentQuestion" class="rajnd-question" />
        <transition name="fade">
          <template v-if="showAnswer">
            <p v-text="currentAnswer" class="rajnd-answer" />
          </template>
        </transition>

        <transition name="fade">
          <template v-if="!showAnswer">
            <div
              :id="`${cardId}-answer`"
              class="card-reveal-btn"
              v-on:click.prevent.stop="showAnswer = !showAnswer"
            >
              <p class="card-reveal-btn-text" v-text="'VISA SVAR'" />
            </div>
          </template>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import categories from "@/constants/categories";

export default {
  name: "RajndCard",
  props: {
    cardId: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    backgroundColor: {
      type: String,
      default: "",
    },
    nrOfQuestions: {
      type: Number,
      default: 0,
    },
    isRandom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      randomCategory: "",
      currentQuestion: "",
      currentAnswer: "",
      showAnswer: false,
      rotated: false,
      rotationFinished: true,
    };
  },
  computed: {
    ...mapState({
      currentQuestions: (state) => state.rajndModule.currentQuestions,
    }),
  },
  watch: {
    currentQuestions: {
      deep: true,
      handler() {
        if (this.currentQuestions.length > 1) {
          this.currentQuestions.forEach((item) => {
            if (this.isRandom) {
              if (item.category === this.randomCategory) {
                this.currentQuestion = item.question;
                this.currentAnswer = item.answer;
              }
            } else if (item.category === this.category) {
              this.currentQuestion = item.question;
              this.currentAnswer = item.answer;
            }
          });
        }
      },
    },
  },
  created() {
    this.getQuestion();
  },
  methods: {
    ...mapActions(["getQuestionFromCategory"]),
    rotateCard() {
      var element = document.getElementById(this.cardId);
      if (element && this.rotationFinished) {
        element.classList.toggle("rotate");
        this.rotationFinished = false;
        this.rotated = !this.rotated;
        if (!this.rotated) {
          setTimeout(() => {
            this.getQuestion();
            this.showAnswer = false;
            this.rotationFinished = true;
          }, 800);
        } else {
          setTimeout(() => {
            this.rotationFinished = true;
          }, 800);
        }
      }
    },
    getQuestion() {
      if (this.isRandom) {
        var randomCategoryIndex = Math.floor(Math.random() * categories.length);
        this.randomCategory = categories[randomCategoryIndex].name;
        this.$store.dispatch("getQuestionFromCategory", this.randomCategory);
      } else {
        this.$store.dispatch("getQuestionFromCategory", this.category);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flip-card {
  background-color: transparent;
  width: 380px;
  height: 240px;
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
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;

  .card-title {
    margin: 10px 20px;
    font-size: 30px;
    font-family: "Orbitron", sans-serif;
  }

  .card-rajnd {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    bottom: 0;
    right: 0;
    height: 80px;
    width: 120px;
    border-top-left-radius: 100% 100%;
    border-bottom-right-radius: 20px;
    background-color: white;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    .card-rajnd-text {
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
  position: relative;
  color: black;
  transform: rotateY(180deg);

  .rajnd-question,
  .rajnd-answer {
    position: absolute;
    left: 0;
    margin: 12px 20px;
    font-size: 20px;
    font-family: "Orbitron", sans-serif;
    transition: all 0.3s;
  }

  .rajnd-question {
    top: 0;
  }

  .rajnd-answer {
    bottom: 0;
  }

  .card-reveal-btn {
    position: absolute;
    align-self: center;
    justify-self: center;
    bottom: 0;
    width: 100%;
    height: 70px;
    border-top-left-radius: 100% 100%;
    border-top-right-radius: 100% 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: white;
    transition: all 0.3s;

    &:hover {
      cursor: pointer;
    }

    .card-reveal-btn-text {
      position: relative;
      text-align: center;
      font-family: "Orbitron", sans-serif;
      font-size: 20px;
      color: black;
      margin-top: 12px;
    }
  }
}

@media screen and (max-width: 400px) {
  .flip-card {
    width: 300px;
    height: 220px;
  }
}
</style>
