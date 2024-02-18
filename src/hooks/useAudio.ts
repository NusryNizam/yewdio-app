import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const useAudio = (): [
  boolean,
  () => void,
  (url: string) => void,
  currentPosition: number,
] => {
  const audio = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState("");
  const [currentPosition, setCurrentPosition] = useState(0);

  const toggle = () => setPlaying(!playing);

  const handleAudioEnded = (interval?: NodeJS.Timeout) => {
    setPlaying(false);
    setCurrentPosition(0);
  };

  const handleError = (e: any) => {
    toast.error(
      "YouTube doesn't support certain types of audio. Please try another one.",
    );
  };

  const load = (url: string) => {
    setSrc(url);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (src) {
      audio.current.src = src;
      audio.current.play().catch((e) => handleError(e));
      setPlaying(true);
      interval = setInterval(() => {
        setCurrentPosition(audio.current.currentTime);
      }, 1000);

      // audio.current.onerror = (e) => handleError(e);
      audio.current.onended = () =>
        handleAudioEnded(interval);
    }

    return () => clearInterval(interval);
  }, [src]);

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [audio, playing]);

  return [playing, toggle, load, currentPosition];
};
