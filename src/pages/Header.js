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
          <div className="all-buttons">
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
              <div className="btn-login-signup">
                <Link to="/signup">
                  <button className="btn-singup">s'inscrire</button>
                </Link>
                <Link to="/login">
                  <button className="btn-login">se connecter</button>
                </Link>
              </div>
            )}
            <div>
              <Link to={token ? "/publish" : "/login"}>
                <button className="btnVend">Vends tes articles</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="filters">
          <div className="filters-price-up-Down">
            <button
              type="text"
              value={sort}
              onClick={(event) => {
                setSort("price-asc");
              }}
            >
              Prix ⇧
            </button>

            <button
              type="text"
              value={sort}
              onClick={(event) => {
                setSort("price-desc");
              }}
            >
              Prix ⇩
            </button>
          </div>

          <div className="filters-price">
            <input
              className="filters-input"
              type="text"
              value={priceMin}
              placeholder="prix mini"
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              className="filters-input"
              type="text"
              value={priceMax}
              placeholder="prix max"
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
