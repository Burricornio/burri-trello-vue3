<template>
  <div
    class="column | p-3 md:mr-4 mb-4 md:mb-0 | rounded bg-gray-100 cursor-move"
  >
    <div class="flex justify-between">
      <a
        v-if="emptyColumn"
        @click="deleteColumn"
        href="#"
        class="text-sm text-right block text-gray-600"
        >Delete</a
      >
      <a
        @click="createCard"
        href="#"
        class="text-sm text-right block text-gray-600"
        >Create card</a
      >
    </div>
    <h3
      contenteditable
      @blur="onEdit"
      class="mb-3 | text-gray-700 font-semibold font-sans tracking-wide text-xl text-center"
    >
      {{ column.name }}
    </h3>
    <!-- Card -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppColumn",
  props: {
    column: {
      type: Object,
    },
  },
  computed: {
    emptyColumn() {
      return (
        this.$store.getters["boardModule/getCardsByColumn"](this.column.id)
          .length === 0
      );
    },
  },
  methods: {
    onEdit(evt) {
      this.$store.dispatch("boardModule/updateColumnName", {
        id: this.column.id,
        name: evt.target.innerText,
      });
    },
    deleteColumn() {
      this.$store.dispatch("boardModule/deleteColumn", this.column.id);
    },
    createCard() {
      this.$store.dispatch("boardModule/createCard", this.column.id);
    },
  },
};
</script>

<style scoped>
.column {
  flex-basis: 25%;
  min-width: 16rem;
}

@media (max-width: 768px) {
  .column {
    flex-basis: 100%;
  }
}
</style>
