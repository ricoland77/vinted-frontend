import vinted from "../assets/images/vinted.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="logo-search">
          <img src={vinted} alt="logo Vinted" />
          <input type="search" placeholder="rechercher des articles" />
        </div>

        <div className="top-menu">
          <button>s'inscrire</button>
          <button>se connecter</button>
          <button>vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
