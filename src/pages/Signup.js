import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <div className="signup">
        {/* formulaire */}
        <form className="signup-form">
          <h2>S’inscrire</h2>
          <input
            className="signup-input"
            type="text"
            value={text}
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <input
            className="signup-input"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="signup-input"
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {/* newsletter */}
          <div className="check-newsletter">
            <input type="checkbox" />
            <p>S'inscrire à notre newsletter</p>
          </div>{" "}
          <p className="Conditions">
            En m'inscrivant, je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button
            className="inscription"
            onClick={() => {
              const fetchData = async () => {
                try {
                  const response = await axios.post(
                    "https://lereacteur-vinted-api.herokuapp.com/user/signup"
                  );
                  //   console.log(response.data);
                } catch (error) {
                  console.log(error.message);
                }
                const token = "1234567";
                handleToken(token);
              };
              fetchData();
            }}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
