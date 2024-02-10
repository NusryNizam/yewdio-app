"use client";

import { useAudio } from "@/hooks/useAudio";
import { useAppSelector } from "@/lib/hooks";
import {
  AUDIO_QUALITY,
  CARD_VARIANT,
} from "@/types/data.types";
import { useEffect } from "react";
import Loader from "../loader/Loader";
import ResultsCard from "../results-card/ResultsCard";
import "./Player.scss";

const Player = () => {
  const { selectedAudio, isGettingAudioDetails } =
    useAppSelector((state) => state.data);

  const [playing, toggle, load] = useAudio();

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
    </div>
  );
};

export default Player;
