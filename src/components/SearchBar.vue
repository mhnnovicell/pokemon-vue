<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />

        <div class="flex">
          <div class="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm rounded-r-lg border-l-2 border bg-gray-700 border-l-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
              placeholder="Enter Pokemon Here..."
              v-model="text"
            />

            <button
              type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      <div
        class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6"
      >
        <div class="p-4 md:w-1/3 flex">
          <div class="items-center">
            <div
              class="flex flex-wrap ml-4 text-2xl text-blue-400 my-6"
              v-for="(pokemon, idx) in filteredPokemon"
              :key="idx"
              v-if="!hasContent"
            >
              <a
                @click="getClickedPokemon(pokemon.url)"
                class="font-medium text-white hover:underline cursor-pointer"
                >{{ pokemon.name }}</a
              >
            </div>

            <div
              v-if="clickedPokemon.length !== 0 && text !== ''"
              class="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700 mt-6"
            >
              <img
                class="rounded-t-lg"
                :src="clickedPokemon.sprites.other.home.front_default"
                alt=""
              />
              <div class="p-5">
                <h5
                  class="my-6 text-2xl font-bold tracking-tight text-white uppercase"
                >
                  {{ clickedPokemon.name }}
                </h5>
                <h2 class="my-6 text-2xl font-bold tracking-tight text-white">
                  Description
                </h2>
                <span class="my-6 tracking-tight text-white">{{
                  content
                }}</span>
                <div class="flex my-6">
                  <span
                    v-for="(types, index) in clickedPokemon.types"
                    :key="index"
                    class="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-blue-900 text-blue-300 uppercase"
                    >{{ types.type.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue';

const pokemons = ref([]);
const text = ref('');

const clickedPokemon = ref([]);

const pokemonId = ref('');

const isExpanded = ref(false);

const content = ref('');

const hasContent = ref(false);

fetch('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0')
  .then((res) => res.json())
  .then((data) => {
    pokemons.value = data.results;
  });

const getPokemonId = (item: any) => {
  console.log(
    pokemons.value.findIndex((p: any) => p.name === item) + 1,
    'pokemons.value.findIndex((p: any) => p.name === item) + 1'
  );
  return pokemons.value.findIndex((p: any) => p.name === item) + 1;
};

const getClickedPokemon = async (pokemon: string) => {
  console.log(pokemon, 'pokemon');

  if (text.value !== '') {
    await fetch(pokemon)
      .then((res: any) => res.json())
      .then((data: any) => {
        clickedPokemon.value = data;
        pokemonId.value = data.id;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  } else {
    clickedPokemon.value = [];
  }

  if (clickedPokemon.value) {
    hasContent.value = true;
  } else {
    hasContent.value = false;
  }

  getPokemonDesc();
};

const getPokemonDesc = async () => {
  if (pokemonId.value !== '') {
    await fetch('https://pokeapi.co/api/v2/characteristic/' + pokemonId.value)
      .then((res: any) => res.json())
      .then((data: any) => {
        console.log(data, 'data.results');
        if (data.descriptions[7].description) {
          content.value = data.descriptions[7].description;
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }
};

onUpdated(() => {
  if (text.value === '') {
    clickedPokemon.value = [];
    hasContent.value = false;
  }
});
const filteredPokemon = computed(() => {
  if (!text.value) {
    return [];
  }

  return pokemons.value.filter((pokemon: any) =>
    pokemon.name.includes(text.value)
  );
});
</script>

<style scoped>
.block-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 24px 20px;
  background-color: skyblue;
  border-radius: 8px;
}
.block-content__paragraph {
  color: white;
  overflow: hidden;
  transition: all 250ms ease-out;
  will-change: height;
}
.block-content__paragraph.block-content__paragraph--is-expanded {
  overflow: initial;
}
.block-content__button {
  color: white;
  text-decoration: underline;
}
</style>
