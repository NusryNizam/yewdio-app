"use client";

import EmptyState from "@/components/EmptyState/EmptyState";
import { useFetchDetails } from "@/hooks/useFetchDetails";
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
import Header from "../_components/header/Header";
import ResultsCard from "../_components/results-card/ResultsCard";

import {
  getAudioDetails,
  playFavouriteItems,
} from "@/lib/dataSlice";
import PlayAllButton from "../_components/play-all-button/PlayAllButton";

const Library = () => {
  const { library } = useAppSelector(selectCollection);
  const { playAudio } = useFetchDetails();
  const dispatch = useAppDispatch();
  const { playlistIndex, currentIndex } = useAppSelector(
    (state) => state.data,
  );

  const playLibrary = () => {
    if (library.length > 0) {
      dispatch(
        playFavouriteItems({ length: library.length }),
      );
    }

    if (playlistIndex.length > 0)
      dispatch(
        getAudioDetails(
          library[playlistIndex[currentIndex ?? 0]].videoId,
        ),
      );
  };

  return (
    <section className="main-section">
      <Header heading="Library" />
      <div className="card-container">
        {library.length > 0 ? (
          (library ?? [])
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
                onClick={() => playAudio(audio.videoId)}
                variant={CARD_VARIANT.DETAILED}
                videoId={audio.videoId}
                videoThumbnails={audio.videoThumbnails}
              />
            ))
        ) : (
          <EmptyState message="Looks like you don't have anything on your library yet." />
        )}
      </div>

      {library.length > 1 ? (
        <PlayAllButton onClick={playLibrary} />
      ) : null}
    </section>
  );
};

export default Library;
