import Image from "next/image";
import "./Card.scss";

import placeholder from "@/../public/placeholder.png";

type CardProps = {
  img: string;
  title: string;
  duration: string;
  author: string;
  onClick: () => void;
};
const Card = ({
  img,
  title,
  duration,
  author,
  onClick,
}: CardProps) => {
  return (
    <button
      role="listitem"
      className="card"
      onClick={onClick}
    >
      <div className="home-image-container">
        <Image
          src={img ?? placeholder}
          alt={title}
          width={150}
          height={150}
        />
      </div>
      <h4 className="font-body-md card-title">{title}</h4>
    </button>
  );
};

export default Card;
