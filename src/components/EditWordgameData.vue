<template>
  <section class="regular-container column">
    <word-data-item
      v-for="(word, index) in words"
      :key="`${word.value}-${index}`"
      class="word-item"
      :id="word.id"
      :word="word.value"
      @updateCallback="updateCallback"
      @deleteCallback="deleteCallback"
    />
  </section>
</template>

<script>
import WordDataItem from "./WordDataItem.vue";

import { mapState, mapActions } from "vuex";
export default {
  components: {
    WordDataItem,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.adminDashboardModule.isLoading,
      words: (state) => state.adminDashboardModule.words,
    }),
  },
  created() {
    this.getWords();
  },
  methods: {
    ...mapActions(["getWords", "updateWord", "deleteWord"]),
    updateCallback(data) {
      const payload = {
        id: data.id,
        value: data.value,
      };
      this.updateWord(payload);
    },
    deleteCallback(wordId) {
      this.deleteWord(wordId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
