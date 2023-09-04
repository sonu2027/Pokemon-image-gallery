import { useEffect, useState } from "react"
import "./pokemonList.css"
import axios from "axios";
import Pokemon from "../pokemon/Pokemon";
function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    async function downloadPokemons() {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/")
        console.log("Response is:",response);
        const pokemonResults = response.data.results
        console.log("Pokemon result:",pokemonResults);
        const pokemonResultPromise = pokemonResults.map((pokemon) =>
            axios.get(pokemon.url))
        console.log("Promise:",pokemonResultPromise);
        const pokemonData = await axios.all(pokemonResultPromise)
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            return { id: pokemon.id, name: pokemon.name, image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, types: pokemon.types }
        })
        setPokemonList(res)
        console.log(res);
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
        </>
    )
}
export default PokemonList