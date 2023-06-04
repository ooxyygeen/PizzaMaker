import Card from "../../components/Card/Card";
import cardData from "../../mock/pizzaMock.js";
import "./MainPage.css";

function Main() {
  return (
    <div className="cards-grid">
      {cardData.map((cardProps, index) => (
        <Card key={index} {...cardProps} />
      ))}
    </div>
  );
}

export default Main;
