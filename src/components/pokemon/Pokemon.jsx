import "./pokemon.css"
function Pokemon({ name, image }) {
    return (
        <div className="pokemon">
            <img src={image} alt="Pokemon Image" />
            <div>{name}</div>
        </div>
    )
}
export default Pokemon