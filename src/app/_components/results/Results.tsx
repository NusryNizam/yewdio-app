import {
  getAudioDetails,
  setIsSearchOverlay,
} from "@/lib/dataSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import ResultsCard from "../results-card/ResultsCard";
import "./Results.scss";

const Results = () => {
  const { results, isSearchingAudio, isSearchOverlay } =
    useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  const hideOverlay = () => {
    dispatch(setIsSearchOverlay(false));
  };

  const playAudio = (videoId: string) => {
    dispatch(setIsSearchOverlay(false));
    debouncedGetDetails(videoId);
  };

  const debouncedGetDetails = useRef(
    debounce(
      (videoId) => {
        dispatch(getAudioDetails(videoId));
      },
      400,
      { leading: true, trailing: false },
    ),
  ).current;

  useEffect(() => {
    return () => debouncedGetDetails.cancel();
  }, [debouncedGetDetails]);

  if (isSearchingAudio)
    return (
      <>
        <div className="results-container">
          <div className="middle">
            <span className="loader"></span>
          </div>
        </div>
        {isSearchOverlay ? (
          <div
            className="search-overlay"
            onClick={hideOverlay}
          ></div>
        ) : null}
      </>
    );

  return (
    <>
      <div className="results-container">
        <ul className="results-wrapper">
          {results && results.length > 0 ? (
            results
              .filter((e) => e.type === AUDIO_TYPES.VIDEO)
              .map(
                ({
                  title,
                  author,
                  videoId,
                  lengthSeconds,
                  videoThumbnails,
                }) => (
                  <ResultsCard
                    key={videoId}
                    onClick={() => playAudio(videoId)}
                    title={title}
                    author={author}
                    duration={lengthSeconds}
                    thumbnailUrl={
                      (videoThumbnails ?? []).filter(
                        (thumb) =>
                          thumb.quality ===
                          THUMBNAIL_QUALITY.MEDIUM,
                      )[0]?.url
                    }
                  />
                ),
              )
          ) : (
            <div className="middle">
              <span className="helper-text">
                Type something to search
              </span>
            </div>
          )}
        </ul>
      </div>
      {isSearchOverlay ? (
        <div
          className="search-overlay"
          onClick={hideOverlay}
        ></div>
      ) : null}
    </>
  );
};

export default Results;
