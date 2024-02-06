"use client";

import { useAppSelector } from "@/lib/hooks";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import { CARD_VARIANT } from "@/types/data.types";
import Header from "../_components/header/Header";
import ResultsCard from "../_components/results-card/ResultsCard";

const Favourites = () => {
  // TODO: Replace the results with favourites
  const { results } = useAppSelector((state) => state.data);
  return (
    <section className="main-section">
      <Header heading="Favourites" />
      <h2 className="font-h3 subtitle">Favourites</h2>
      <div className="card-container">
        {(results ?? [])
          .filter(
            (result) => result.type === AUDIO_TYPES.VIDEO,
          )
          .map((audio) => (
            <ResultsCard
              key={audio.videoId}
              author={audio.author}
              title={audio.title}
              thumbnailUrl={
                audio.videoThumbnails?.filter(
                  (thumb) =>
                    thumb.quality ===
                    THUMBNAIL_QUALITY.MIDDLE,
                )[0]?.url
              }
              duration={audio.lengthSeconds}
              onClick={() => {}}
              variant={CARD_VARIANT.DETAILED}
            />
          ))}
      </div>
    </section>
  );
};

export default Favourites;
