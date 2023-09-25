import { useState, useEffect } from "react";
import axios from "axios";
function SearchedPokemon(props) {
    const [pokemon, setPokemon] = useState({})

    async function downloadPokemon() {

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.inputText}`)

        console.log("r", response);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
        console.log(pokemon.name, pokemon.image, pokemon.height, pokemon.weight, pokemon.types)
    }

    useEffect(() => {
        downloadPokemon()
    }, [props.inputText])

    return (
        <div className="pokemon-details-wrapper">
            <div id="pokemon">
                <img src={pokemon.image} alt="image" className="pokemon-image" />
                <span className="pokemon-name">{pokemon.name}</span>
            </div>
            <div id="about">
                <span className="pokemon-height">Height : {pokemon.height}</span>
                <span className="pokemon-weight">Weight : {pokemon.weight}</span>
                <span className="pokemon-types">
                    Types: {pokemon.types && pokemon.types.map((t) => <span key={t}>{t},&nbsp;</span>)}
                </span>
            </div>
        </div>

    )
}
export default SearchedPokemon