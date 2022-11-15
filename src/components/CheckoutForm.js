import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const CardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(CardElement, {
        name: "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF",
      });
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        { stripeToken: stripeToken }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <input type="submit" />
    </form>
  );
};
export default CheckoutForm;
