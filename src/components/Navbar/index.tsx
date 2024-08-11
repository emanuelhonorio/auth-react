import { Link } from "react-router-dom";
import "./styles.css"
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return <div className="navbar">
        <div className="logo">Pixelator</div>
    
        <ul className="navbar__ul">
            <li>
            <Link to={"/users"}>Users</Link>
            </li>
            {isLoggedIn ? <li>
                <a href="#" onClick={logout}>Logout</a>
            </li> :  <Link to={"/login"}>Entrar</Link>}
           
        </ul>
    </div>
}

export default Navbar