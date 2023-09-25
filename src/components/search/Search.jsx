import "./Search.css"
import { BsSearch } from "react-icons/bs"
function Search({updateSearchTerm}){
    return (
       <div className="search-wrapper">
        <BsSearch/>
         <input 
         id="pokemon-name-serach" 
         type="text" 
         placeholder="Search Pokemon"
         onChange={(e)=>updateSearchTerm(e.target.value)} />
       </div>
    )
}
export default Search