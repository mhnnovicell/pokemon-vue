<template>
  <div>
    <input
      type="text"
      placeholder="Søg efter pokemon"
      v-model="pokemonName"
      @keydown="test"
    />

    <!-- <div v-for="(pokemon, pokemonIdx) in filteredPokemon" :key="pokemonIdx">
      {{ pokemon }}
    </div> -->
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { usePokemonStore } from "@/stores/pokemonStore";

export default {
  setup() {
    const pokemonStore = usePokemonStore();

    const { getSpecificPokemonData } = storeToRefs(pokemonStore);

    function test() {
      pokemonStore.getSpecificPokemonData(this.pokemonName);
      console.log(pokemonStore.getSpecificPokemonData(this.pokemonName));
    }
  },

  data() {
    return {
      pokemonName: "",
    };
  },

  //   methods: {
  //     getSpecificPokemonData() {
  //       pokemonStore.getSpecificPokemonData(this.pokemonName);
  //     },
  //   },

  computed: {
    filteredPokemon() {
      return this.postList.filter((post) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
