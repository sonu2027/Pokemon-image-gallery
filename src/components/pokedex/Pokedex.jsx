import { Link } from "react-router-dom"
import PokemonList from "../pokemonList/PokemonList.jsx"
import Search from "../search/Search.jsx"
import "./Pokedex.css"
import { useState } from "react"
import Poke from "../poke/Poke.jsx"

function Pokedex(){
    const [searchTerm, setSearchTerm]=useState("")
    return (
        <div className="pokedex-wrapper">
        <Link to="./"><h1>Find your Pokemon</h1></Link>
        <Search updateSearchTerm={setSearchTerm} />
        {searchTerm}
        {searchTerm.length==0?<PokemonList/>:<Poke inputText={searchTerm} />}
        </div>
    )
}
export default Pokedex