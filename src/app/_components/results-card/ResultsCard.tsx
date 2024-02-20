import Image from "next/image";

import { CARD_VARIANT } from "@/types/data.types";
import { secondsToHMS } from "@/utils/formatting";
import React, { useMemo } from "react";
import "./ResultsCard.scss";

import placeholder from "@/../public/placeholder.png";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { selectCollection } from "@/selectors/collection.selector";

import AddToLibraryIcon from "@/../public/icons/icon-add-to-library.svg";
import FavouriteIcon from "@/../public/icons/icon-favourite.svg";
import MoreIcon from "@/../public/icons/icon-more.svg";
import RemoveFavouriteIcon from "@/../public/icons/icon-remove-favourite.svg";
import RemoveFromLibraryIcon from "@/../public/icons/icon-remove-library.svg";
import {
  addToFavourites,
  addToLibrary,
  removeFromFavourites,
  removeFromLibrary,
} from "@/lib/collectionSlice";
import {
  AUDIO_TYPES,
  ISearchResponseDTO,
} from "@/types/api.types";
import {
  Button,
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import PopoverItem from "../popover-item/PopoverItem";

type ResultsCardProp = {
  title: string;
  duration: number;
  author: string;
  thumbnailUrl: string;
  onClick: () => void;
  variant?: CARD_VARIANT;
  addToLibraryExt?: () => void;
  videoId?: string;
  videoThumbnails: ISearchResponseDTO["videoThumbnails"];
};

const ResultsCard = ({
  title,
  duration,
  author,
  thumbnailUrl,
  onClick,
  variant = CARD_VARIANT.NORMAL,
  addToLibraryExt,
  videoId,
  videoThumbnails,
}: ResultsCardProp) => {
  const { library, favourites } = useAppSelector(
    selectCollection,
  );
  const dispatch = useAppDispatch();

  const stopPropagation = (
    event: React.MouseEvent<
      HTMLButtonElement,
      globalThis.MouseEvent
    >,
  ) => {
    event.stopPropagation();
    if (addToLibraryExt) addToLibraryExt();
  };

  const moreOptions = (
    event: React.MouseEvent<
      HTMLButtonElement,
      globalThis.MouseEvent
    >,
  ) => {
    event.stopPropagation();
  };

  const isInLibary = useMemo(
    () =>
      library.findIndex(
        (item) => item.videoId === videoId,
      ) > -1,
    [library, videoId],
  );

  const isInFavourites = useMemo(
    () =>
      favourites.some((item) => item.videoId === videoId),
    [favourites, videoId],
  );

  const handleAddToFavourites = () => {
    dispatch(
      addToFavourites({
        title: title,
        videoId: videoId ?? "",
        videoThumbnails: videoThumbnails,
        author: author,
        lengthSeconds: duration,
        type: AUDIO_TYPES.VIDEO,
        authorId: "",
      }),
    );
    close();
  };

  const handleRemvoeFromFavourites = () => {
    dispatch(
      removeFromFavourites({
        title: title,
        videoId: videoId ?? "",
        videoThumbnails: videoThumbnails,
        author: author,
        lengthSeconds: duration,
        type: AUDIO_TYPES.VIDEO,
        authorId: "",
      }),
    );
    close();
  };

  const handleAddToLibrary = () => {
    const data: ISearchResponseDTO = {
      type: AUDIO_TYPES.VIDEO,
      title: title,
      videoId: videoId ?? "",
      author: author,
      authorId: "",
      videoThumbnails: videoThumbnails,
      lengthSeconds: duration,
    };
    dispatch(addToLibrary(data));
    close();
  };

  const handleRemoveFromLibrary = () => {
    const data: ISearchResponseDTO = {
      type: AUDIO_TYPES.VIDEO,
      title: title,
      videoId: videoId ?? "",
      author: author,
      authorId: "",
      videoThumbnails: videoThumbnails,
      lengthSeconds: duration,
    };
    dispatch(removeFromLibrary(data));
    close();
  };

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
          <Image
            src={AddToLibraryIcon}
            alt="Add to library"
          />
        </button>
      ) : null}

      <DialogTrigger>
        <Button
          aria-label="More options"
          className={`more-options-button`}
        >
          <Image src={MoreIcon} alt="More options" />
        </Button>
        <ModalOverlay className={`modal-overlay`} />
        <Modal className={`modal`} isDismissable={true}>
          <Dialog>
            {({ close }) => (
              <>
                <div className="popover-items-container">
                  <div className="readonly">
                    <div
                      className={`image-container-readonly`}
                    >
                      {/* <div className="duration font-body-sm-rg">
                        {secondsToHMS(duration)}
                      </div> */}
                      <Image
                        unoptimized={true}
                        src={
                          thumbnailUrl
                            ? thumbnailUrl
                            : placeholder
                        }
                        alt={`Thumbnail - ${title}`}
                        width={80}
                        height={80}
                      />
                      {variant ===
                      CARD_VARIANT.SINGLETON ? (
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
                      <div className="result-author">
                        {author}
                      </div>
                    </div>
                  </div>

                  {!isInFavourites ? (
                    <PopoverItem
                      text="Add to Favourites"
                      Icon={FavouriteIcon}
                      onClick={handleAddToFavourites}
                    />
                  ) : (
                    <PopoverItem
                      text="Remove from Favourites"
                      Icon={RemoveFavouriteIcon}
                      onClick={handleRemvoeFromFavourites}
                    />
                  )}
                  {!isInLibary ? (
                    <PopoverItem
                      text="Add to Library"
                      Icon={AddToLibraryIcon}
                      onClick={handleAddToLibrary}
                    />
                  ) : (
                    <PopoverItem
                      text="Remove from Library"
                      Icon={RemoveFromLibraryIcon}
                      onClick={handleRemoveFromLibrary}
                    />
                  )}
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>

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
          unoptimized={true}
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
        <div className="result-author font-body-rg">
          {author}
        </div>
        <div className="duration font-body-sm-rg">
          {secondsToHMS(duration)}
        </div>
      </div>
    </li>
  );
};

export default ResultsCard;
