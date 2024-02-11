"use client";

import EmptyState from "@/components/EmptyState/EmptyState";
import { useAppSelector } from "@/lib/hooks";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import { CARD_VARIANT } from "@/types/data.types";
import Header from "../_components/header/Header";
import ResultsCard from "../_components/results-card/ResultsCard";

const Favourites = () => {
  const { favourites } = useAppSelector(
    (state) => state.collection,
  );

  return (
    <section className="main-section">
      <Header heading="Favourites" />
      <div className="card-container">
        {favourites.length > 0 ? (
          (favourites ?? [])
            .filter(
              (item) => item.type === AUDIO_TYPES.VIDEO,
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
            ))
        ) : (
          <EmptyState
            message="Looks like you don't have any favourites
        yet."
          />
        )}
      </div>
    </section>
  );
};

export default Favourites;
