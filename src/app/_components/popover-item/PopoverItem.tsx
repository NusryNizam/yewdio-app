import Image from "next/image";
import "./PopoverItem.scss";

type PopoverItemProps = {
  Icon: string;
  text: string;
  onClick?: () => void;
};
const PopoverItem = ({
  Icon,
  text,
  onClick,
}: PopoverItemProps) => {
  return (
    <button className="popover-item" onClick={onClick}>
      <Image src={Icon} alt={text} />
      <div className="font-body-md">{text}</div>
    </button>
  );
};

export default PopoverItem;
