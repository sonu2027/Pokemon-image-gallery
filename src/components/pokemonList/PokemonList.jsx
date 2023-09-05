import { useEffect, useState } from "react"
import "./pokemonList.css"
import axios from "axios";
import Pokemon from "../pokemon/Pokemon";
function PokemonList() {
    const [pokemonList, setPokemonList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [pokedexUrl, setPokedexUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl]=useState("")
    const [prevUrl, setPrevUrl]=useState("")
    async function downloadPokemons() {
        setIsLoading(true)
        const response = await axios.get(pokedexUrl) // This download list of 20 pokemon
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
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
    }
    useEffect(() => {
        downloadPokemons()
    }, [pokedexUrl])
    return (
        <>
            <div className="pokemon-list-wrapper">Pokemon List</div>
            <div className="all-pokemon">
            {(isLoading) ? 'Loading....' :
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
            }
            </div>
            <div className="controls">
                <button disabled={prevUrl==undefined} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl==undefined}  onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </>
    )
}
export default PokemonList