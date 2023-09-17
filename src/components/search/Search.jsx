import "./Search.css"
function Search({updateSearchTerm}){
    return (
       <div className="search-wrapper">
         <input 
         id="pokemon-name-serach" 
         type="text" 
         placeholder="Search Pokemon"
         onChange={(e)=>updateSearchTerm(e.target.value)} />
       </div>
    )
}
export default Search