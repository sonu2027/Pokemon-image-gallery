import { useEffect, useState } from "react"
import "./pokemonList.css"
import axios from "axios";
import Pokemon from "../pokemon/Pokemon";
function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const POKEDEX_URL="https://pokeapi.co/api/v2/pokemon/"
    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL) // This download list of 20 pokemon
        console.log("Response is:",response);
        const pokemonResults = response.data.results // We get the array of pokemon from result
        console.log("Pokemon result:",pokemonResults);
        const pokemonResultPromise = pokemonResults.map((pokemon) =>
            axios.get(pokemon.url))
        console.log("Promise:",pokemonResultPromise);
        const pokemonData = await axios.all(pokemonResultPromise)
        console.log(pokemonData);
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            return { id: pokemon.id, name: pokemon.name, image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, types: pokemon.types }
        })
        setPokemonList(pokeListResult)
        console.log(pokeListResult);
        setIsLoading(false)
    }
    useEffect(() => {
        downloadPokemons()
    }, [])
    return (
        <>
            <div className="pokemon-list-wrapper">Pokemon List</div>
            {(isLoading) ? 'Loading....' :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
            }
            <div className="controls">
                <button>Prev</button>
                <button>Next</button>
            </div>
        </>
    )
}
export default PokemonList