import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios";
function PokemonDetails() {
    const { id } = useParams
    const [pokemon, setPokemon] = useState({})
    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name: response.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.weight,
            height: response.height,
            types: response.data.types.map((t) => t.type.name)
        })
    }
    useEffect(() => {
        downloadPokemon()
    }, [])
    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-name">{pokemon.name}</div>
            <img src={pokemon.image} alt="image" className="pokemon-image" />
            <div className="pokemon-height">Height : {pokemon.height}</div>
            <div className="pokemon-weight">Weight : {pokemon.weight}</div>
            <div className="pokemon-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
            </div>
        </div>

    )
}
export default PokemonDetails