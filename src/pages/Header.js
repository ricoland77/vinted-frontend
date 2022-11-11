import { Link } from "react-router-dom";
import vinted from "../assets/images/vinted.svg";

const Header = ({ token, handleToken }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-search">
          <Link to="/">
            <img src={vinted} alt="logo Vinted" />
          </Link>
          <input type="search" placeholder="rechercher des articles" />
        </div>
        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Déconnexion
          </button>
        ) : (
          <div className="top-menu">
            <Link to="/signup">
              <button>s'inscrire</button>
            </Link>
            <Link to="/login">
              <button>se connecter</button>
            </Link>
            {/* <button>vends tes articles</button> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
