<template>
  <div class="container">
    <template v-if="categories && categories.length > 0 && !isLoading">
      <div v-for="(category, index) in getCategories" :key="`${category.name}-${index}`">
        <RajndCard
          :cardId="`card-id-${index}`"
          :category="category.name"
          :backgroundColor="category.backgroundColor"
          :nrOfQuestions="category.nrOfQuestions"
        />
      </div>
      <RajndCard
        :cardId="`Random-${categories.length}`"
        :category="'Random'"
        :backgroundColor="'#736598'"
        :isRandom="true"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RajndCard from "@/components/RajndCard.vue";

export default {
  name: "Rajnd",
  components: {
    RajndCard,
  },
  data() {
    return {
      randomQuestion: null,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.rajndModule.isLoading,
      categories: (state) => state.rajndModule.categories,
    }),
    getCategories() {
      return this.categories;
    },
  },
  created() {
    this.fetchRajndCategories();
  },
  methods: {
    ...mapActions(["fetchRajndCategories"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding-top: 20px;
}

@media screen and (max-width: 600px) {
  .container {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
