<template>
  <div class="word-item">
    <p>Ord</p>
    <textarea
      v-model="wordData"
      class="textarea-input no-padding"
      :style="{ margin: '4px' }"
      :class="{ 'no-border': !isEditingMode }"
      :disabled="!isEditingMode"
    />

    <div class="actions-row">
      <button v-if="isEditingMode" @click="editWord" class="action-done-btn">Klar</button>
      <img src="@/assets/icons/edit.png" class="action edit-action" @click="setEditingMode" />
      <img src="@/assets/icons/delete.png" class="action delete-action" @click="setConfirmDelete" />
    </div>
    <transition name="fadeHeight">
      <div v-if="shouldConfirmDelete" class="delete-confirm">
        <span> Är du säker?</span>
        <p @click="deleteWord">Ja</p>
        <p @click="setConfirmDelete">Nej</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    word: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isEditingMode: false,
      shouldConfirmDelete: false,
      wordData: "",
    };
  },
  created() {
    this.wordData = this.word;
  },
  methods: {
    setEditingMode() {
      this.isEditingMode = !this.isEditingMode;
      this.shouldConfirmDelete = false;
    },
    editWord() {
      this.$emit("updateCallback", {
        id: this.id,
        value: this.wordData,
      });
      this.setEditingMode();
    },
    setConfirmDelete() {
      this.isEditingMode = false;
      this.shouldConfirmDelete = !this.shouldConfirmDelete;
    },
    deleteWord() {
      this.$emit("deleteCallback", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.word-item {
  position: relative;
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid black;
  font-family: "Source Code Pro", sans-serif;
  font-size: 18px;

  p {
    margin: 4px;
  }

  .actions-row {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .action-done-btn {
      position: absolute;
      left: 0;
      width: 80px;
      height: 34px;
      border: none;
      background: #91ecce;
      font-family: "Source Code Pro", sans-serif;
      font-size: 18px;
      color: white;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
        transform: scale(1.05);
      }
    }

    .action {
      object-fit: contain;
      height: 34px;
      width: 34px;
      padding: 4px;
      margin: 0 4px;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
        transform: scale(1.05);
      }
    }
  }

  .delete-confirm {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Source Code Pro", sans-serif;
    font-size: 18px;
    color: white;

    span {
      color: black;
    }

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 34px;
      margin: 0 20px;
      background: black;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .word-item {
    width: 90%;
  }
}
</style>
