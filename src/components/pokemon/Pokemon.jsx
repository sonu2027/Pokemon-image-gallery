import "./pokemon.css"
import { Link } from "react-router-dom"
function Pokemon({ name, image, id }) {
    return (
        <div className="pokemon">
            <Link to={`pokemon/${id}`}>
                <img src={image} alt="Pokemon Image" />
            </Link>
            <div>{name}</div>
        </div>
    )
}
export default Pokemon