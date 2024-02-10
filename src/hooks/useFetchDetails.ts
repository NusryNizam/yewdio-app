import {
  getAudioDetails,
  setIsSearchOverlay,
} from "@/lib/dataSlice";
import { useAppDispatch } from "@/lib/hooks";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";

export const useFetchDetails = (): [
  (videoId: string) => void,
] => {
  const dispatch = useAppDispatch();

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

  return [playAudio];
};
