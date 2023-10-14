<template>
  <div class="flex flex-col items-center | relative">
    <div class="flex order-1 items-center">
      <div>
        <h1
          contenteditable
          @blur="editName"
          class="text-gray-700 font-semibold font-sans tracking-wide text-3xl text-center"
        >
          {{ board.name }}
        </h1>
        <a
          @click="createColumn"
          href="#"
          class="ml-2 text-sm block text-center mt-3"
          >Create column</a
        >
      </div>
    </div>
    <div
      class="flex order-0 md:order-2 items-center mb-3 md:mb-0 md:absolute right-0 top-0"
    >
      <a @click="changeBackground" href="#" class="mr-2 text-sm"
        >Change background</a
      >
      <input
        v-model="searchTerm"
        type="search"
        class="bg-gray-300 rounded p-1 text-gray-600 text-sm mr-3"
        placeholder="Search cards"
      />
      <UserAvatar />
      <a @click="userLogout" href="#" class="ml-2 text-sm">Logout</a>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";
import { computed, watchEffect } from "vue";
import router from "@/router";

export default {
  name: "NavBar",
  components: {
    UserAvatar,
  },
  setup() {
    const store = useStore();
    const board = computed(() => store.state.boardModule.board);

    const searchTerm = computed({
      get: () => store.state.boardModule.searchTerm,
      set: (value) => store.commit("boardModule/setSearchTerm", value),
    });

    async function userLogout() {
      try {
        await store.dispatch("userModule/userLogout");
        router.push("/");
      } catch (error) {
        console.log("error");
      }
    }

    const element = document.body;

    watchEffect(() => {
      element.style.backgroundColor = board.value.backgroundColor;
    });

    let color = "";

    function changeBackground() {
      element.onmousemove = function (event) {
        color = getBackgroundColor(event);
        element.style.backgroundColor = color;

        element.ondblclick = function () {
          element.onmousemove = null;
          store.dispatch("boardModule/updateBoard", {
            id: board.value.id,
            key: "backgroundColor",
            value: color,
          });
        };
      };
    }

    async function createColumn() {
      try {
        await store.dispatch("boardModule/createColumn");
      } catch (error) {
        console.log(error.message);
      }
    }

    const editName = (evt) =>
      store.dispatch("boardModule/updateBoard", {
        id: board.value.id,
        key: "name",
        value: evt.target.innerText,
      });

    function getBackgroundColor(event) {
      const hue = parseInt((360 / window.innerWidth) * event.clientX, 10);
      const saturation = parseInt(
        (360 / window.innerHeight) * event.clientY,
        10
      );
      return `hsla(${hue}, ${saturation}%, 50%, 1)`;
    }

    return {
      board,
      userLogout,
      createColumn,
      editName,
      changeBackground,
      searchTerm,
    };
  },
};
</script>
