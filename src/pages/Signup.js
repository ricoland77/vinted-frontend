import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    //   console.log("fdslfsd");

    try {
      const response = await axios.post(
        "https://site--backend-vinted--kq885dbc6xpm.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      // console.log(response.data);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      Cookies.get("token");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

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
              checked={newsletter}
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <p>S'inscrire à notre newsletter</p>
          </div>
          <p className="Conditions">
            En m'inscrivant, je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. <br /> Je
            confirme avoir au moins 18 ans.
          </p>
          <button className="inscription" onClick={handleClick}>
            S'inscrire
          </button>
          <div className="ever-count">
            <Link to="/login">
              <p>Tu as déjà un compte ? connecte-toi !</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
