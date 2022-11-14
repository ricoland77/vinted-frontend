import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const [picture, setPicture] = useState();

  const [data, setData] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: "Bearer",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "#EBECEE" }}>
      <p>Vends ton article</p>

      <form onSubmit={handleSubmit}>
        <div className="files">
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          <button type="submit">Envoyer</button>
        </div>

        <div className="publish">
          <div className="title-publish">
            <p>Titre</p>
            <input
              className="input-publish"
              type="text"
              placeholder="ex : Chemise Sézane verte"
            />
          </div>
          <div className="title-publish">
            <p>Décris ton article</p>
            <input
              className="input-publish"
              type="text"
              placeholder="ex : porté quelques fois, taille correcte"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Publish;
