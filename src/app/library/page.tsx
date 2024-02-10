"use client";

import { useFetchDetails } from "@/hooks/useFetchDetails";
import { useAppSelector } from "@/lib/hooks";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import { CARD_VARIANT } from "@/types/data.types";
import Header from "../_components/header/Header";
import ResultsCard from "../_components/results-card/ResultsCard";

const Library = () => {
  const { library } = useAppSelector((state) => state.data);
  const [playAudio] = useFetchDetails();

  return (
    <section className="main-section">
      <Header heading="Library" />
      <div className="card-container">
        {(library ?? [])
          .filter((item) => item.type === AUDIO_TYPES.VIDEO)
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
            />
          ))}
      </div>
    </section>
  );
};

export default Library;
