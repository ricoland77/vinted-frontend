import { Link } from "react-router-dom";
import vinted from "../assets/images/vinted.svg";

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
              className="btnSearch"
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
              className="btnDeconnexion"
              onClick={() => {
                handleToken(null);
              }}
            >
              Déconnexion
            </button>
          ) : (
            <div className="top-menu">
              <Link to="/signup">
                <button className="btnInscrire">s'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="btnInscrire">se connecter</button>
              </Link>
              {/* <button>vends tes articles</button> */}
            </div>
          )}
          <Link to={token ? "/publish" : "/login"}>
            <button className="btnVend">Vends tes articles</button>
          </Link>
        </div>
        {/* <div>
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
              setPriceMin(event.target.value);
            }}
          />
          <input
            type="text"
            value={priceMax}
            placeholder="Prix max"
            onChange={(event) => {
              setPriceMax(event.target.value);
            }}
          />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
