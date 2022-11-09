import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Offer = () => {
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
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <div>
      <p>je suis sur la page offer</p>
      <Link to="/">Retour à la page d'accueil</Link>
    </div>
  );
};

export default Offer;
