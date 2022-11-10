import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <div className="signup">
        {/* formulaire */}

        <form action="submit" className="signup-form">
          <h2>S’inscrire</h2>
          <input
            className="signup-input"
            type="text"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
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
            <input
              type="checkbox"
              value={newsletter}
              onChange={(event) => {
                setNewsletter(event.target.checked);
              }}
            />
            <p>S'inscrire à notre newsletter</p>
          </div>{" "}
          <p className="Conditions">
            En m'inscrivant, je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. <br /> Je
            confirme avoir au moins 18 ans.
          </p>
          <button
            className="inscription"
            onClick={async (event) => {
              event.preventDefault();
              //   console.log("fdslfsd");

              const form = {
                username: username,
                email: email,
                password: password,
                newsletter: newsletter,
              };

              try {
                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                  form
                );
                // console.log(response.data);
                const token = response.data.token;
                Cookies.set("token", token, { expires: 7 });
                Cookies.get("token");
              } catch (error) {
                console.log(error.message);
              }
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
