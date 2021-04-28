<template>
  <div class="full-centered-container">
    <transition name="fade">
      <div
        v-if="showStatusMessage"
        class="status-msg"
        :style="{ backgroundColor: success ? '#91ecce' : '#ec9191' }"
      >
        <p v-text="statusMessage" />
      </div>
    </transition>
    <section class="dashboard-section rajnd-section">
      <h1 class="section-title">Skapa ny fråga till 'Du e rajnd'</h1>
      <select v-model="selectedCategory" class="select-input">
        <option value="" disabled selected>Välj kategori</option>
        <option
          v-for="(category, index) in categories"
          :key="index"
          :value="category"
          class="select-option"
        >
          {{ category.name }}
        </option>
      </select>

      <textarea v-model="question" placeholder="Fråga" class="textarea-input" />
      <textarea v-model="answer" placeholder="Svar" class="textarea-input" />
      <div class="section-create-btn" @click="addRajndQuestionHandler">
        <p>Lägg till fråga</p>
      </div>
    </section>
    <section class="dashboard-section wordgame-section">
      <h1 class="section-title">Skapa nytt ord till 'Vad gör du?'</h1>
      <textarea v-model="word" placeholder="Ord" class="textarea-input" />
      <div class="section-create-btn" @click="addWordHandler">
        <p>Lägg till ord</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import categories from "@/constants/categories";

export default {
  name: "AddQuestionsAndWords",
  data() {
    return {
      question: "",
      answer: "",
      selectedCategory: "",
      word: "",
      categories,
      showStatusMessage: false,
      statusMessage: "",
      success: false,
    };
  },
  methods: {
    ...mapActions(["addRajndQuestion", "addWord"]),
    async addRajndQuestionHandler() {
      const result = await this.addRajndQuestion({
        categoryId: this.selectedCategory.firebaseId,
        question: this.question,
        answer: this.answer,
      });

      this.createStatusMessage(result.success, result.msg);
    },
    async addWordHandler() {
      const result = await this.addWord(this.word);

      this.createStatusMessage(result.success, result.msg);
    },
    createStatusMessage(success, msg) {
      this.statusMessage = msg;
      this.success = success;
      this.showStatusMessage = true;
      setTimeout(() => {
        this.statusMessage = "";
        this.success = success;
        this.showStatusMessage = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.status-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 40px;
  padding: 20px 40px;
  border-radius: 8px;
  font-family: "Source Code Pro", sans-serif;
  font-size: 20px;
  color: white;
  transition: all 0.3s;
}

.dashboard-section {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  max-width: 500px;
  min-width: 400px;
  height: 600px;
  margin: 20px;
  background: white;
  border: 2px solid black;

  .section-title {
    max-width: 80%;
    height: 60px;
    margin: 8px;
    font-family: "Source Code Pro", sans-serif;
    font-size: 24px;
    color: black;
  }

  .section-create-btn {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 60px;
    margin: 20px;
    background: #91ecce;
    font-family: "Source Code Pro", sans-serif;
    font-size: 16px;
    color: white;

    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
}

@media screen and (max-width: 768px) {
  .full-centered-container {
    flex-direction: column;

    .dashboard-section {
      min-width: 300px;
      width: 90%;
      height: auto;
      margin: 20px 0;

      .section-title {
        font-size: 16px;
      }
    }
  }
}
</style>
