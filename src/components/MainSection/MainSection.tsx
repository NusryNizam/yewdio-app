import Header from "@/app/_components/header/Header";
import Card from "../Card/Card";
import "./MainSection.scss";

const MainSection = () => {
  // TODO: Remove
  const test = [
    1, 2, 3, 4, 5, 6, 7, 8, 11, 22, 33, 44, 55, 66, 234,
    2323, 2323223, 3445, 454545, 566, 6767, 7878,
  ];
  return (
    <section className="main-section">
      <Header heading="Home" />
      <h2 className="font-h3 subtitle">Your Library</h2>
      <div className="main-card-container">
        {test.map((t) => (
          <Card
            key={t}
            title="Hello world"
            duration="222"
            genre="Music"
            img="test"
          />
        ))}
      </div>
    </section>
  );
};

export default MainSection;
