import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import banner from "../assets/images/banner.jpg";

const Home = ({
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sort,
  setSort,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(priceMin);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, sort]);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <div className="container">
      <div className="filters">
        <div className="filters-price-up-Down">
          <button
            type="text"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
            }}
          >
            Prix ⇧
          </button>

          <button
            type="text"
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
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

      <div className="container">
        <div>
          <nav className="nav">
            <ul className="menu">
              <li>Femmes</li>
              <li>Hommes</li>
              <li>Enfants</li>
              <li>Maison</li>
              <li>Divertissement</li>
              <li>Animaux</li>
              <li>À propos</li>
              <li>Notre plateforme</li>
            </ul>
          </nav>
        </div>

        {/* bannière vinted */}
        <div className="banner">
          <img src={banner} alt="banière du site Vinted" />
        </div>
        <div className="encart">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <Link to="/publish">
            <button className="buttom-by">Commencer à vendre</button>
          </Link>
        </div>

        <div className="popular-title">
          <h2>Articles populaires</h2>
          <Link to="/">Voir tout</Link>
        </div>

        {/* recupération des annonces en BDD */}
        <div className="all-offers">
          {data.offers.map((offer) => {
            // console.log(data.offers);
            return (
              <div key={offer._id} className="container">
                <div className="offer">
                  <Link to={`/offer/${offer._id}`}>
                    <img src={offer.product_image.url} alt="" />
                  </Link>
                  <p className="price-offer">{offer.product_price} €</p>
                  <p className="name-offer">{offer.product_name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
