import Image from "next/image";
import PlayIcon from "../../../../public/icons/icon-play.svg";
import "./PlayAllButton.scss";

type PlayAllButtonProps = {
  onClick?: () => void;
};
const PlayAllButton = ({ onClick }: PlayAllButtonProps) => {
  return (
    <div className="play-all-container">
      <button className="play-all" onClick={onClick}>
        <Image src={PlayIcon} alt="play all" />
        <span className="font-body-lg-md">Play All</span>
      </button>
    </div>
  );
};

export default PlayAllButton;
