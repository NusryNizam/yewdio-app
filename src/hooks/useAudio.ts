import { useEffect, useRef, useState } from "react";

export const useAudio = (): [
  boolean,
  () => void,
  (url: string) => void,
] => {
  const audio = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState("");

  const toggle = () => setPlaying(!playing);

  const handleAudioEnded = () => {
    setPlaying(false);
  };

  const load = (url: string) => {
    setSrc(url);
  };

  useEffect(() => {
    if (src) {
      audio.current.src = src;
      audio.current.play();
    }
  }, [src]);

  useEffect(() => {
    audio.current.onended = handleAudioEnded;
  }, [audio]);

  useEffect(() => {
    if (playing) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [audio, playing]);

  return [playing, toggle, load];
};
