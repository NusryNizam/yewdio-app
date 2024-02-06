import Image from "next/image";

import { secondsToHMS } from "@/utils/formatting";
import "./ResultsCard.scss";

type ResultsCardProp = {
  title: string;
  videoId: string;
  duration: number;
  author: string;
  thumbnailUrl: string;
};

const ResultsCard = ({
  title,
  videoId,
  duration,
  author,
  thumbnailUrl,
}: ResultsCardProp) => {
  return (
    <li className="result-card" role="button" tabIndex={0}>
      <div className="image-container">
        <Image
          src={thumbnailUrl}
          alt={`Thumbnail - ${title}`}
          width={120}
          height={90}
        />
      </div>
      <div className="info-container">
        <h4 className="result-title font-body-md">
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
