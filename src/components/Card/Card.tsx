import Image from "next/image";
import "./Card.scss";

import placeholder from "@/../public/placeholder.png";

type CardProps = {
  img: string;
  title: string;
  duration: string;
  genre: string;
};
const Card = ({ img, title, duration, genre }: CardProps) => {
  return (
    <button role="listitem" className="card">
      <Image src={placeholder} alt={""} width={160} height={160} />
      <h4 className="font-body-md card-title">This is dfdf the card title</h4>
    </button>
  );
};

export default Card;
