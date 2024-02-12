"use client";

import { useAudio } from "@/hooks/useAudio";
import {
  addToFavourites,
  removeFromFavourites,
} from "@/lib/collectionSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { selectCollection } from "@/selectors/collection.selector";
import { AUDIO_TYPES } from "@/types/api.types";
import {
  AUDIO_QUALITY,
  CARD_VARIANT,
} from "@/types/data.types";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import Loader from "../loader/Loader";
import ResultsCard from "../results-card/ResultsCard";
import "./Player.scss";

import FavouritesOutlineIcon from "../../../../public/icons/icon-favourite-outline.svg";
import FavouritesIcon from "../../../../public/icons/icon-favourite.svg";
import PauseIcon from "../../../../public/icons/icon-pause.svg";
import NextIcon from "../../../../public/icons/icon-play-next.svg";
import PreviousIcon from "../../../../public/icons/icon-play-previous.svg";
import PlayIcon from "../../../../public/icons/icon-play.svg";

const Player = () => {
  const { selectedAudio, isGettingAudioDetails } =
    useAppSelector((state) => state.data);
  const { favourites } = useAppSelector(selectCollection);
  const dispatch = useAppDispatch();

  const [playing, toggle, load, currentPosition] =
    useAudio();

  const toggleAudio = () => {
    toggle();
  };

  useEffect(() => {
    if (selectedAudio) {
      load(
        selectedAudio.adaptiveFormats.filter(
          (format) =>
            format.audioQuality === AUDIO_QUALITY.MEDIUM,
        )[0].url,
      );
    }
  }, [load, selectedAudio]);

  const isFavourite = useMemo(
    () =>
      selectedAudio &&
      favourites.findIndex(
        (favourite) =>
          favourite.videoId === selectedAudio.videoId,
      ) > -1,

    [favourites, selectedAudio],
  );

  const handleAddToFavourites = () => {
    if (selectedAudio) {
      dispatch(
        addToFavourites({
          title: selectedAudio.title,
          videoId: selectedAudio.videoId,
          videoThumbnails: selectedAudio.videoThumbnails,
          author: selectedAudio.author,
          authorId: selectedAudio.authorId,
          lengthSeconds: selectedAudio.lengthSeconds,
          type: AUDIO_TYPES.VIDEO,
        }),
      );
    }
  };

  const handleRemoveFromFavourites = () => {
    if (selectedAudio) {
      dispatch(
        removeFromFavourites({
          title: selectedAudio.title,
          videoId: selectedAudio.videoId,
          videoThumbnails: selectedAudio.videoThumbnails,
          author: selectedAudio.author,
          authorId: selectedAudio.authorId,
          lengthSeconds: selectedAudio.lengthSeconds,
          type: AUDIO_TYPES.VIDEO,
        }),
      );
    }
  };

  useEffect(() => {
    console.log(currentPosition);
    console.log(selectedAudio?.lengthSeconds);
  }, [currentPosition, selectedAudio?.lengthSeconds]);

  return (
    <div className="player">
      {isGettingAudioDetails ? (
        <Loader customClassName="player-spinner" />
      ) : null}
      <div
        className={`now-playing-info-container ${
          isGettingAudioDetails ? "blur" : ""
        }`}
      >
        <div
          className="slider"
          style={
            selectedAudio
              ? {
                  width: `${
                    (currentPosition /
                      selectedAudio.lengthSeconds) *
                    100
                  }%`,
                }
              : { width: "0%" }
          }
        ></div>
        <ResultsCard
          title={selectedAudio?.title ?? ""}
          duration={selectedAudio?.lengthSeconds ?? 0}
          author={selectedAudio?.author ?? ""}
          thumbnailUrl={
            selectedAudio?.videoThumbnails[5].url ?? ""
          }
          onClick={toggleAudio}
          variant={CARD_VARIANT.SINGLETON}
        />
      </div>
      {selectedAudio && !isGettingAudioDetails ? (
        isFavourite ? (
          <div className="icon-favourite-container">
            <button
              className="icon-favourite"
              onClick={handleRemoveFromFavourites}
            >
              <Image
                src={FavouritesIcon}
                alt="Remove from favourites"
              />
            </button>
          </div>
        ) : (
          <div className="icon-favourite-container">
            <button
              className="icon-favourite-outline"
              onClick={handleAddToFavourites}
            >
              <Image
                src={FavouritesOutlineIcon}
                alt="Add to favourites"
              />
            </button>
          </div>
        )
      ) : null}
      <div
        className="controls"
        style={
          !selectedAudio
            ? {
                filter: "brightness(40%)",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <button className="previous">
          <Image src={PreviousIcon} alt="Previous audio" />
        </button>
        {playing ? (
          <button
            className="pause"
            onClick={toggleAudio}
            disabled={!selectedAudio}
          >
            <Image
              src={PauseIcon}
              alt="pause icon"
              className="play-pause-icon"
            />
          </button>
        ) : (
          <button
            className="play"
            onClick={toggleAudio}
            disabled={!selectedAudio}
          >
            <Image
              src={PlayIcon}
              alt="play icon"
              className="play-pause-icon"
            />
          </button>
        )}

        <button className="next">
          <Image src={NextIcon} alt="next audio" />
        </button>
      </div>
    </div>
  );
};

export default Player;
