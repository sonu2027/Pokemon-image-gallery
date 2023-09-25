import { Link } from "react-router-dom"
import PokemonList from "../pokemonList/PokemonList.jsx"
import Search from "../search/Search.jsx"
import "./Pokedex.css"
import { useState } from "react"
import SearchedPokemon from "../searchedPokemon/searchedPokemon.jsx"

function Pokedex(){
    const [searchTerm, setSearchTerm]=useState("")
    return (
        <div className="pokedex-wrapper">
        <Link to="./"><h1>Pokedex</h1></Link>
        <Search updateSearchTerm={setSearchTerm} />
        {searchTerm}
        {searchTerm.length==0?<PokemonList/>:<SearchedPokemon inputText={searchTerm} />}
        </div>
    )
}
export default Pokedex