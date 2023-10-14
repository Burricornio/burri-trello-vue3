<template>
  <draggable v-model="columns" class="board" item-key="key" group="columns">
    <template #item="{ element }">
      <AppColumn :column="element">
        <CardList :column="element" />
      </AppColumn>
    </template>
  </draggable>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import AppColumn from "@/components/AppColumn.vue";
import CardList from "@/components/CardList.vue";
import draggable from "vuedraggable";

const store = useStore();

const columns = computed({
  get: () => store.getters["boardModule/getColumns"],
  set: (value) => store.dispatch("boardModule/updateColumns", value),
});
</script>

<style scoped>
.board {
  min-height: 50vh;
  @apply py-10 flex overflow-x-scroll;
}

@media (max-width: 768px) {
  .board {
    min-height: 100vh;
    flex-wrap: wrap;
  }
}
</style>
