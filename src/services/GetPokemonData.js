import axios from "axios";

export default {
  async getAllPokemonData() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=200`;

    const response = await axios.get(url);
    console.log("getAllPokemonData response", response.data);
    return response.data;
  },
  async getSpecificPokemonData(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const response = await axios.get(url);
    console.log("getSpecificPokemonData response", response.data);

    return response.data;
  },

  async getPokemonDetails(pokemonId) {
    const url = `https://pokeapi.co/api/v2/characteristic/${pokemonId}`;

    const response = await axios.get(url);
    console.log("getPokemonDetails response", response.data);
    return response.data;
  },
};
