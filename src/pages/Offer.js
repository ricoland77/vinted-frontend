import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
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
    <div className="container-payment">
      <div className="all-offer">
        <img src={data.product_image.secure_url} alt="" />
        <div className="text-details">
          <p>{data.product_price} €</p>

          {data.product_details.map((detail, index) => {
            const objectKey = Object.keys(detail)[0];
            return (
              <>
                <div className="all-details" key={index}>
                  <span className="details">{objectKey} : </span>
                  <span className="response-details">{detail[objectKey]}</span>
                </div>
              </>
            );
          })}
          <div className="details-name">
            {data.product_name.length < 40
              ? data.product_name
              : data.product_name.slice(0, 40) + "..."}
          </div>
          <div className="details-description">
            {data.product_description.length < 50
              ? data.product_description
              : data.product_description.slice(0, 50) + "..."}
          </div>
          <div className="avatar-details">
            <img src={data.owner.account.avatar.secure_url} alt="" />
            <p>{data.owner.account.username}</p>
          </div>

          <button
            className="buttom-acheter"
            onClick={() => {
              navigate("/payment", {
                state: {
                  title: data.product_name,
                  price: data.product_price,
                },
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
