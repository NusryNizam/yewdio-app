"use client";

import EmptyState from "@/components/EmptyState/EmptyState";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import { playFavouriteItems } from "@/lib/dataSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { selectCollection } from "@/selectors/collection.selector";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import { CARD_VARIANT } from "@/types/data.types";
import { useEffect } from "react";
import Header from "../_components/header/Header";
import PlayAllButton from "../_components/play-all-button/PlayAllButton";
import ResultsCard from "../_components/results-card/ResultsCard";

const Favourites = () => {
  const [load] = useFetchDetails();
  const { favourites } = useAppSelector(selectCollection);

  const { playlistIndex } = useAppSelector(
    (state) => state.data,
  );

  const dispatch = useAppDispatch();

  const playFavourites = () => {
    if (favourites.length > 0) {
      dispatch(
        playFavouriteItems({ length: favourites.length }),
      );
    }
  };

  useEffect(() => {
    if (playlistIndex.length > 0)
      load(favourites[playlistIndex[0]].videoId);
  }, [favourites, load, playlistIndex]);

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

      {favourites.length > 1 ? (
        <PlayAllButton onClick={playFavourites} />
      ) : null}
    </section>
  );
};

export default Favourites;
