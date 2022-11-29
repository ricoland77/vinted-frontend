import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ token, title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: token,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );

      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-payment">
      <div className="total-payment">
        <p className="title-resume-pay">Résumé de la commande</p>
        <div>
          <div className="text-resume">
            <p>Commande</p>
            <p>{price} €</p>
          </div>
          <div className="text-resume">
            <p>Frais de protection acheteurs</p>
            <p>0.59 €</p>
          </div>
          <div className="text-resume">
            <p>Frais de port</p>
            <p>1.18 €</p>
          </div>
        </div>
        <div className="total-resume">
          <p className="total-page-payment">Total</p>
          <p className="total-page-payment">{price + 0.59 + 1.18} €</p>
        </div>

        <p className="total-text">
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <span>{title}</span>. Vous allez payer{" "}
          <span>{price + 0.59 + 1.18} €</span> (frais de protection et frais de
          port inclus).
        </p>
        <div className="card">
          {!completed ? (
            <form onSubmit={handleSubmit}>
              <CardElement />
            </form>
          ) : (
            <span>Paiement effectué ! </span>
          )}
        </div>
        <button className="buttom-pay" type="submit">
          Pay
        </button>
      </div>
    </div>
  );
};
export default CheckoutForm;
