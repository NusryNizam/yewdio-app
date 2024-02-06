import Image from "next/image";

import { secondsToHMS } from "@/utils/formatting";
import "./ResultsCard.scss";

type ResultsCardProp = {
  title: string;
  duration: number;
  author: string;
  thumbnailUrl: string;
  onClick: () => void;
};

const ResultsCard = ({
  title,
  duration,
  author,
  thumbnailUrl,
  onClick,
}: ResultsCardProp) => {
  return (
    <li
      className="result-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <div className="image-container">
        <Image
          src={thumbnailUrl}
          alt={`Thumbnail - ${title}`}
          width={120}
          height={90}
        />
      </div>
      <div className="info-container">
        <h4
          className="result-title font-body-md"
          title={title}
        >
          {title}
        </h4>
        <div className="result-author">{author}</div>
        <div className="duration font-body-sm-rg">
          {secondsToHMS(duration)}
        </div>
      </div>
    </li>
  );
};

export default ResultsCard;
