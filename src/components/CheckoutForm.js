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
    <div>
      <p>Résumé de la commande</p>
      <div>
        <p>Commande {price}</p>
        <p>Frais de protection acheteurs 0.59 €</p>
        <p>Frais de port 1.18 €</p>
      </div>
      <p>Total {price + 0.59 + 1.18}</p>
      <p>
        Il ne vous reste plus qu'une étape pour vous offrir {title}. Vous allez
        payer {price + 0.59 + 1.18} (frais de protection et frais de port
        inclus).
      </p>
      <div className="card">
        {!completed ? (
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Valider</button>
          </form>
        ) : (
          <span>Paiement effectué ! </span>
        )}
      </div>
    </div>
  );
};
export default CheckoutForm;
