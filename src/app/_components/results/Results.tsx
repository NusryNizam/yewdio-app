import { setIsSearchOverlay } from "@/lib/dataSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import {
  AUDIO_TYPES,
  THUMBNAIL_QUALITY,
} from "@/types/api.types";
import ResultsCard from "../results-card/ResultsCard";
import "./Results.scss";

const Results = () => {
  const { results, isSearchingAudio, isSearchOverlay } =
    useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();

  const hideOverlay = () => {
    console.log("click hide");

    dispatch(setIsSearchOverlay(false));
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
          >
            testing
          </div>
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
                    title={title}
                    videoId={videoId}
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
        >
          testing
        </div>
      ) : null}
    </>
  );
};

export default Results;
