import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header-container">
        <a href="/" className="logo">
          <img src="src\assets\logo.png" alt="logo" />
        </a>
        <h1>Твоя піца на Металістів 3</h1>
        <a href="/" className="cart">
          <img src="src\assets\shopping-cart.png" alt="cart" />
        </a>
      </div>
    </header>
  );
}

export default Header;
