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
        console.log(response.data);
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
      <div>
        {data.offers.map((offer) => {
          console.log(data.offers);
          return (
            <div className="offer">
              {offer.product_pictures.map((image) => {
                // console.log(offer.product_pictures);
                return <img src={offer.product_pictures.url} alt="" />;
              })}
              <p>{offer.product_price} €</p>
              <p>{offer.product_name}</p>
              {/* <img src={offer.product_pictures.url} alt="" /> */}
            </div>
          );
        })}
      </div>

      {/* // */}
      <p>je suis sur la page home</p>
      <Link to="/offer">aller à la page offer</Link>
    </div>
  );
};

export default Home;
