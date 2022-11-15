import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <div className="offer-details">
      <div className="all-offer">
        <img src={data.product_image.secure_url} alt="" />
        <div className="text-details">
          <p>{data.product_price} €</p>
          {/* Je parcours product_details, à chaque tour je récupère le nom de la clef de l'objet du tour */}
          {data.product_details.map((detail, index) => {
            const objectKey = Object.keys(detail)[0];
            //   console.log(objectKey);
            return (
              <div key={index}>
                {/* J'affiche la clef de l'objet */}
                <span className="details">{objectKey} : </span>
                {/* J'affivhe le contenu de la clef */}
                <span className="details">{detail[objectKey]}</span>
              </div>
            );
          })}
          <Link to="/payment">
            <button>Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;
