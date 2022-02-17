import { defineStore } from "pinia";
import PokemonService from "@/services/GetPokemonData";

export const usePokemonStore = defineStore("pokemonStore", {
  state: () => ({
    isLoading: false,
    allPokemonData: [],
    getSpecificPokemonData: [],
  }),
  getters: {},
  mutations: {},
  actions: {
    async getAllPokemonData() {
      try {
        this.allPokemonData = await PokemonService.getAllPokemonData();
      } catch (error) {
        // let the form component display the error
        return error;
      }
      // Load userinfo
    },

    async getSpecificPokemonData() {
      try {
        this.getSpecificPokemonData =
          await PokemonService.getSpecificPokemonData();
      } catch (error) {
        // let the form component display the error
        return error;
      }
      // Load userinfo
    },
  },
});
