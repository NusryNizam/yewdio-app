"use client";

import {
  searchAudio,
  setIsSearchOverlay,
} from "@/lib/dataSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { dmSans } from "@/utils/fonts";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import Results from "../results/Results";
import "./Header.scss";

type HeaderProps = {
  heading: string;
};
const Header = ({ heading }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { isSearchOverlay } = useAppSelector(
    (state) => state.data,
  );

  const dispatch = useAppDispatch();

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      dispatch(setIsSearchOverlay(true));
      debouncedSearch(value);
    }
  };

  const debouncedSearch = useRef(
    debounce(
      (term) => {
        dispatch(searchAudio(term));
      },
      400,
      { leading: false, trailing: true },
    ),
  ).current;

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

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
        onFocus={() => dispatch(setIsSearchOverlay(true))}
      />
      {isSearchOverlay ? <Results /> : null}
    </div>
  );
};

export default Header;
