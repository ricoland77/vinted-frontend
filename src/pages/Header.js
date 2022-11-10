import { Link } from "react-router-dom";
import vinted from "../assets/images/vinted.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="logo-search">
          <Link to="/">
            <img src={vinted} alt="logo Vinted" />
          </Link>
          <input type="search" placeholder="rechercher des articles" />
        </div>

        <div className="top-menu">
          <Link to="/signup">
            <button>s'inscrire</button>
          </Link>

          <button>se connecter</button>
          <button>vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
