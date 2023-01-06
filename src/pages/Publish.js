import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [, setData] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);

    // console.log(formData);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      console.log("ok : ", response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <div style={{ backgroundColor: "#EBECEE" }}>
      <div className="container">
        <p className="sell-your-item">Vends ton article</p>

        <form onSubmit={handleSubmit}>
          {picture ? (
            <img
              className="picture-file"
              src={URL.createObjectURL(picture)}
              alt=""
            />
          ) : (
            <div className="files">
              <div className="div-add-picture">
                <label className="add-picture" htmlFor="picture">
                  <span>+ </span>
                  Ajouter une photo
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="picture"
                  onChange={(event) => {
                    // console.log(event.target.files[0]);
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
            </div>
          )}

          {/* titre et description */}
          <div className="publish">
            <div className="input">
              <p>Titre</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="input">
              <p>Décris ton article</p>
              <textarea
                className="input-publish"
                type="text"
                value={description}
                placeholder="ex : porté quelques fois, taille correcte"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>

          {/* marque taille couleur état lieu */}
          <div className="publish">
            <div className="input">
              <p>Marque</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="input">
              <p>Taille</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : L / 40/12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="input">
              <p>Couleur</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="input">
              <p>État</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="input">
              <p>Lieu</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>

          {/* prix */}
          <div className="publish">
            <div className="input">
              <p>Prix</p>
              <input
                className="input-publish"
                type="text"
                placeholder="ex : 0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="clic-change">
              <input type="checkBox" />
              <p>Je suis intéressé(e) par les échanges</p>
            </div>
            <div className="center-buttom">
              <button className="go" type="submit">
                Envoyer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    (<Navigate to="/login" />)()
  );
};
export default Publish;
