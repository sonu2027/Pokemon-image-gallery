import { useState, useEffect } from "react";
import axios from "axios";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    setPokemonListState((state) => ({ ...pokemonListState, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl); // This download list of 20 pokemon
    console.log("Response is:", response);
    const pokemonResults = response.data.results; // We get the array of pokemon from result
    console.log("Pokemon result:", pokemonResults);
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    console.log("Promise:", pokemonResultPromise);
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });

    setPokemonListState((state) => ({ ...state, pokemonList: pokeListResult }));
    console.log(pokeListResult);
    setPokemonListState((state) => ({
      ...state,
      isLoading: false,
    }));
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return { pokemonListState, setPokemonListState };
}
export default usePokemonList;