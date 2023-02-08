import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login">
        <form action="submit" className="login-form">
          <h2>Se connecter</h2>

          <input
            className="signup-input"
            type="email"
            value={email}
            placeholder="Adresse email"
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
          <p style={{ color: "red" }}>{errorMessage}</p>
          <button
            className="inscription"
            onClick={async (event) => {
              try {
                event.preventDefault();
                setErrorMessage("");

                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/user/login",
                  {
                    email: email,
                    password: password,
                  }
                );
                if (response.data.token) {
                  handleToken(response.data.token);
                  navigate("/");
                }

                if (!email || !password) {
                  setErrorMessage("Veuillez remplir tous les champs");
                }
              } catch (error) {
                console.log(error.response);
              }
            }}
          >
            Se connecter
          </button>
          <div className="ever-count">
            <Link to="/signup">
              <p>Pas encore de compte ? Inscris-toi !</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
