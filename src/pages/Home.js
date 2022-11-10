import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import banner from "../assets/images/banner.jpg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <div>
      <div className="container">
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

      <div className="popular-title">
        <h2>Articles populaires</h2>
        <Link to="/">Voir tout</Link>
      </div>

      {/* recupération des annonces en BDD */}
      <div className="all-offers">
        {data.offers.map((offer) => {
          // console.log(data.offers);
          return (
            <div key={offer._id} className="offer">
              <Link to={`/offer/${offer._id}`}>
                <img src={offer.product_image.url} alt="" />
              </Link>
              <p>{offer.product_price} €</p>
              <p>{offer.product_name}</p>
            </div>
          );
        })}
      </div>

      {/* // */}
      <p>je suis sur la page home</p>
      <Link to="/offer/:id">aller à la page offer</Link>
    </div>
  );
};

export default Home;
