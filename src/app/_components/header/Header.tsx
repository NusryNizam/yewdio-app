import "./Header.scss";
import { dmSans } from "@/utils/fonts";

type HeaderProps = {
  heading: string;
};
const Header = ({ heading }: HeaderProps) => {
  return (
    <div className="header">
      <h1 className={`${dmSans.className} heading`}>{heading}</h1>
      <input
        type="text"
        alt="Search for audio"
        placeholder="Search for audio"
        className="search-input"
      />
    </div>
  );
};

export default Header;
