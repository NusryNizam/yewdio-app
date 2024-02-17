"use client";

import EmptyState from "@/components/EmptyState/EmptyState";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import { useAppSelector } from "@/lib/hooks";
import { selectCollection } from "@/selectors/collection.selector";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import { CARD_VARIANT } from "@/types/data.types";
import Header from "../_components/header/Header";
import ResultsCard from "../_components/results-card/ResultsCard";

import { Metadata } from "next";
import PlayAllButton from "../_components/play-all-button/PlayAllButton";

export const metadata: Metadata = {
  title: 'Yewdio | Library',
 };

const Library = () => {
  const { library } = useAppSelector(selectCollection);
  const { playAudio } = useFetchDetails();

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

      {library.length > 1 ? <PlayAllButton /> : null}
    </section>
  );
};

export default Library;
