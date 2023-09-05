import { Link } from "react-router-dom"
import PokemonList from "../pokemonList/PokemonList.jsx"
import Search from "../search/Search.jsx"
import "./Pokedex.css"
function Pokedex(){
    return (
        <div className="pokedex-wrapper">
        <Link to="./"><h1>Pokedex</h1></Link>
        <Search/>
        <PokemonList/>
        </div>
    )
}
export default Pokedex