"use client";

import { useState } from "react";
import "./Header.scss";
import { dmSans } from "@/utils/fonts";
import Results from "../results/Results";

type HeaderProps = {
  heading: string;
};
const Header = ({ heading }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="header">
      <h1 className={`${dmSans.className} heading`}>
        {heading}
      </h1>
      <input
        type="text"
        alt="Search for audio"
        placeholder="Search for audio"
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm ? <Results /> : null}
    </div>
  );
};

export default Header;
