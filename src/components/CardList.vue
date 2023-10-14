<template>
  <draggable v-model="cards" item-key="key" group="cards">
    <template #item="{ element }">
      <BoardCard :card="element" />
    </template>
  </draggable>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import BoardCard from "@/components/BoardCard.vue";
import draggable from "vuedraggable";

export default {
  name: "CardList",
  components: {
    BoardCard,
    draggable,
  },
  props: {
    column: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();

    const cards = computed({
      get: () => store.getters["boardModule/getCardsByColumn"](props.column.id),
      set: (value) =>
        store.dispatch("boardModule/updateCards", {
          column: props.column,
          cards: value,
        }),
    });

    return { cards };
  },
};
</script>
