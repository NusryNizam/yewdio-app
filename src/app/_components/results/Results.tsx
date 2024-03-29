"use client";

import { useFetchDetails } from "@/hooks/useFetchDetails";
import { addToLibrary } from "@/lib/collectionSlice";
import { setIsSearchOverlay } from "@/lib/dataSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import {
  AUDIO_TYPES,
  ISearchResponseDTO,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import ResultsCard from "../results-card/ResultsCard";
import "./Results.scss";

const Results = () => {
  const { results, isSearchingAudio, isSearchOverlay } =
    useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();
  const { playAudio } = useFetchDetails();

  const hideOverlay = () => {
    dispatch(setIsSearchOverlay(false));
  };

  const handleAddToLibrary = (data: ISearchResponseDTO) => {
    dispatch(addToLibrary(data));
  };

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
              .map((result) => {
                const {
                  title,
                  author,
                  videoId,
                  lengthSeconds,
                  videoThumbnails,
                } = result;

                return (
                  <ResultsCard
                    key={videoId}
                    onClick={() => {
                      playAudio(videoId);
                      dispatch(setIsSearchOverlay(false));
                    }}
                    addToLibraryExt={() =>
                      handleAddToLibrary(result)
                    }
                    title={title}
                    author={author}
                    duration={lengthSeconds}
                    videoId={videoId}
                    thumbnailUrl={
                      (videoThumbnails ?? []).filter(
                        (thumb) =>
                          thumb.quality ===
                          THUMBNAIL_QUALITY.MIDDLE,
                      )[0]?.url
                    }
                    videoThumbnails={videoThumbnails}
                  />
                );
              })
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
