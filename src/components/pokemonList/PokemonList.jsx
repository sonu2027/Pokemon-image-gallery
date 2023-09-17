import "./pokemonList.css"
import Pokemon from "../pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {

    const { pokemonListState, setPokemonListState } = usePokemonList()

    return (
        <>
            <div className="pokemon-list-wrapper">Pokemon List</div>
            <div className="all-pokemon">
                {(pokemonListState.isLoading) ? 'Loading....' :
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className="controls">
                <button disabled={pokemonListState.prevUrl == undefined} onClick={() => {
                    const urlToSet = pokemonListState.prevUrl
                    setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
                }}>Prev</button>
                <button disabled={pokemonListState.nextUrl == undefined} onClick={() => {
                    const urlToSet = pokemonListState.nextUrl
                    setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
                }}>Next</button>
            </div>
        </>
    )
}
export default PokemonList