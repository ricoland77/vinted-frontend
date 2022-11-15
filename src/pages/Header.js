import { Link } from "react-router-dom";
import vinted from "../assets/images/vinted.svg";
import { Range } from "react-range";

const Header = ({
  token,
  handleToken,
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sort,
  setSort,
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="top-menu">
          <div className="logo-search">
            <Link to="/">
              <img src={vinted} alt="logo Vinted" />
            </Link>
            <input
              value={search}
              type="search"
              placeholder="rechercher des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
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
          <Link to={token ? "/publish" : "/login"}>
            <button>Vends tes articles</button>
          </Link>
        </div>
        <div>
          <button
            type="text"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
            }}
          >
            Prix ⇡
          </button>

          <input
            type="text"
            value={priceMin}
            placeholder="Prix mini"
            onChange={(event) => {
              setPriceMin(event.target.priceMin);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
