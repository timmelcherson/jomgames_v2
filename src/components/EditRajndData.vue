<template>
  <section class="regular-container column">
    <div class="categories-row">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="category-row-item"
        :class="{ active: activeCategoryIndex === index }"
        v-text="category.name"
        @click="changeCategory(category, index)"
      />
    </div>
    <rajnd-data-item
      v-for="(item, index) in questions"
      :key="`${item.question}-${index}`"
      :question="item.question"
      :answer="item.answer"
      :id="item.id"
      @updateCallback="updateCallback"
      @deleteCallback="deleteCallback"
    />
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import categories from "@/constants/categories";
import RajndDataItem from "./RajndDataItem.vue";

export default {
  components: {
    RajndDataItem,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.adminDashboardModule.isLoading,
      questions: (state) => state.adminDashboardModule.questions,
    }),
  },
  data() {
    return {
      categories,
      currentQuestions: [],
      activeCategoryIndex: 0,
    };
  },
  methods: {
    ...mapActions(["getQuestionsFromCategory", "updateRajndQuestion", "deleteRajndQuestion"]),
    changeCategory(category, index) {
      this.activeCategoryIndex = index;
      this.getQuestionsFromCategory(category.firebaseId);
    },
    updateCallback(data) {
      const payload = {
        categoryId: this.categories[this.activeCategoryIndex].firebaseId,
        data,
      };
      this.updateRajndQuestion(payload);
    },
    deleteCallback(questionId) {
      const payload = {
        categoryId: this.categories[this.activeCategoryIndex].firebaseId,
        questionId,
      };
      this.deleteRajndQuestion(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-row {
  display: flex;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  border: 2px solid black;

  .category-row-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    flex: 1;
    border-right: 2px solid black;
    font-family: "Source Code Pro", sans-serif;
    font-size: 18px;
    text-align: center;
    transition: all 0.3s;

    &:last-child {
      border: none;
    }

    &:hover {
      cursor: pointer;
      color: white;
      background: black;
    }

    &.active {
      background: black;
      color: white;

      &:hover {
        cursor: pointer;
        opacity: 0.6;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .categories-row {
    width: 90%;
    flex-direction: column;
    height: auto;

    .category-row-item {
      border-right: none;
    }
  }
}
</style>
