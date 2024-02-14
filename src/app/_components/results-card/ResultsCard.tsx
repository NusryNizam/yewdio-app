import Image from "next/image";

import { CARD_VARIANT } from "@/types/data.types";
import { secondsToHMS } from "@/utils/formatting";
import React, { useMemo } from "react";
import "./ResultsCard.scss";

import placeholder from "@/../public/placeholder.png";
import { useAppSelector } from "@/lib/hooks";
import { selectCollection } from "@/selectors/collection.selector";

type ResultsCardProp = {
  title: string;
  duration: number;
  author: string;
  thumbnailUrl: string;
  onClick: () => void;
  variant?: CARD_VARIANT;
  addToLibrary?: () => void;
  videoId?: string;
};

const ResultsCard = ({
  title,
  duration,
  author,
  thumbnailUrl,
  onClick,
  variant = CARD_VARIANT.NORMAL,
  addToLibrary,
  videoId,
}: ResultsCardProp) => {
  // TODO: Add elements for the detailed variant

  const { library } = useAppSelector(selectCollection);

  const stopPropagation = (
    event: React.MouseEvent<
      HTMLButtonElement,
      globalThis.MouseEvent
    >,
  ) => {
    event.stopPropagation();
    if (addToLibrary) addToLibrary();
  };

  const moreOptions = (
    event: React.MouseEvent<
      HTMLButtonElement,
      globalThis.MouseEvent
    >,
  ) => {
    event.stopPropagation();
    // TODO: More optoins
  };

  const isInLibary = useMemo(
    () =>
      library.findIndex(
        (item) => item.videoId === videoId,
      ) > -1,
    [library, videoId],
  );

  return (
    <li
      className={`result-card ${
        variant === CARD_VARIANT.DETAILED
          ? "result-card-detailed"
          : variant === CARD_VARIANT.SINGLETON
          ? "result-card-singleton"
          : ""
      }`}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {variant !== CARD_VARIANT.SINGLETON && !isInLibary ? (
        <button
          className={`add-to-library-button`}
          onClick={stopPropagation}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1665 13.1667C13.4734 13.1667 13.7309 13.0627 13.9389 12.8547C14.1469 12.6467 14.2506 12.3896 14.2498 12.0834V9.91669H16.4165C16.7234 9.91669 16.9809 9.81269 17.1889 9.60469C17.3969 9.39669 17.5006 9.13958 17.4998 8.83335C17.4998 8.52641 17.3958 8.2693 17.1878 8.06202C16.9798 7.85474 16.7227 7.75074 16.4165 7.75002H14.2498V5.58335C14.2498 5.27641 14.1458 5.0193 13.9378 4.81202C13.7298 4.60474 13.4727 4.50074 13.1665 4.50002C12.8596 4.50002 12.6024 4.60402 12.3952 4.81202C12.1879 5.02002 12.0839 5.27713 12.0832 5.58335V7.75002H9.9165C9.60956 7.75002 9.35245 7.85402 9.14517 8.06202C8.93789 8.27002 8.83389 8.52713 8.83317 8.83335C8.83317 9.1403 8.93717 9.39777 9.14517 9.60577C9.35317 9.81377 9.61028 9.91741 9.9165 9.91669H12.0832V12.0834C12.0832 12.3903 12.1872 12.6478 12.3952 12.8558C12.6032 13.0638 12.8603 13.1674 13.1665 13.1667ZM6.6665 17.5C6.07067 17.5 5.56078 17.288 5.13684 16.8641C4.71289 16.4402 4.50056 15.9299 4.49984 15.3334V2.33335C4.49984 1.73752 4.71217 1.22763 5.13684 0.803687C5.5615 0.379743 6.07139 0.167409 6.6665 0.166687H19.6665C20.2623 0.166687 20.7726 0.37902 21.1973 0.803687C21.6219 1.22835 21.8339 1.73824 21.8332 2.33335V15.3334C21.8332 15.9292 21.6212 16.4394 21.1973 16.8641C20.7733 17.2888 20.2631 17.5007 19.6665 17.5H6.6665ZM6.6665 15.3334H19.6665V2.33335H6.6665V15.3334ZM2.33317 21.8334C1.73734 21.8334 1.22745 21.6214 0.803504 21.1974C0.37956 20.7735 0.167226 20.2632 0.166504 19.6667V5.58335C0.166504 5.27641 0.270504 5.0193 0.478504 4.81202C0.686504 4.60474 0.943615 4.50074 1.24984 4.50002C1.55678 4.50002 1.81425 4.60402 2.02225 4.81202C2.23025 5.02002 2.33389 5.27713 2.33317 5.58335V19.6667H16.4165C16.7234 19.6667 16.9809 19.7707 17.1889 19.9787C17.3969 20.1867 17.5006 20.4438 17.4998 20.75C17.4998 21.057 17.3958 21.3144 17.1878 21.5224C16.9798 21.7304 16.7227 21.8341 16.4165 21.8334H2.33317Z"
              fill="white"
            />
          </svg>
        </button>
      ) : null}
      <button
        className={`more-options-button`}
        onClick={moreOptions}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9993 24.7174C15.6322 24.7174 15.3185 24.5872 15.058 24.3267C14.7976 24.0663 14.6669 23.7521 14.666 23.3841C14.666 23.0178 14.7967 22.7041 15.058 22.4427C15.3193 22.1814 15.6331 22.0507 15.9993 22.0507C16.3665 22.0507 16.6802 22.1814 16.9407 22.4427C17.2011 22.7041 17.3318 23.0178 17.3327 23.3841C17.3327 23.7512 17.202 24.0654 16.9407 24.3267C16.6793 24.5881 16.3656 24.7183 15.9993 24.7174ZM15.9993 17.3334C15.6322 17.3334 15.3185 17.2027 15.058 16.9414C14.7976 16.6801 14.6669 16.3663 14.666 16.0001C14.666 15.6329 14.7967 15.3192 15.058 15.0587C15.3193 14.7983 15.6331 14.6676 15.9993 14.6667C16.3665 14.6667 16.6802 14.7974 16.9407 15.0587C17.2011 15.3201 17.3318 15.6338 17.3327 16.0001C17.3327 16.3672 17.202 16.6809 16.9407 16.9414C16.6793 17.2018 16.3656 17.3325 15.9993 17.3334ZM15.9993 9.94939C15.6322 9.94939 15.3185 9.81872 15.058 9.55739C14.7976 9.29605 14.6669 8.98227 14.666 8.61605C14.666 8.24894 14.7967 7.93472 15.058 7.67339C15.3193 7.41205 15.6331 7.28183 15.9993 7.28272C16.3665 7.28272 16.6802 7.41294 16.9407 7.67339C17.2011 7.93383 17.3318 8.24805 17.3327 8.61605C17.3327 8.98227 17.202 9.29605 16.9407 9.55739C16.6793 9.81872 16.3656 9.94939 15.9993 9.94939Z"
            fill="white"
          />
        </svg>
      </button>
      <div
        className={`image-container ${
          variant === CARD_VARIANT.DETAILED
            ? "image-container-detailed"
            : variant === CARD_VARIANT.SINGLETON
            ? "image-container-singleton"
            : ""
        }`}
      >
        <Image
          src={thumbnailUrl ? thumbnailUrl : placeholder}
          alt={`Thumbnail - ${title}`}
          width={120}
          height={90}
        />
        {variant === CARD_VARIANT.SINGLETON ? (
          <div className="image-overlay"></div>
        ) : null}
      </div>
      <div className="info-container">
        {title ? (
          <h4
            className="result-title font-body-md"
            title={title}
          >
            {title}
          </h4>
        ) : (
          <div>Audio Title</div>
        )}
        <div className="result-author">{author}</div>
        <div className="duration font-body-sm-rg">
          {secondsToHMS(duration)}
        </div>
      </div>
    </li>
  );
};

export default ResultsCard;
