"use client";

import Header from "@/app/_components/header/Header";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import { useAppSelector } from "@/lib/hooks";
import { THUMBNAIL_QUALITY } from "@/types/api.types";
import Link from "next/link";
import Card from "../Card/Card";
import "./MainSection.scss";

const MainSection = () => {
  const { library, favourites } = useAppSelector(
    (state) => state.data,
  );
  const [playAudio] = useFetchDetails();

  return (
    <section className="main-section">
      <Header heading="Home" />
      <h2 className="font-h3 subtitle">Your Library</h2>
      <div className="main-card-container">
        {library.length > 0 ? (
          <>
            {library.slice(0, 6).map((item) => (
              <Card
                key={item.videoId}
                title={item.title}
                duration={item.lengthSeconds.toString()}
                author={item.author}
                img={
                  item.videoThumbnails.filter(
                    (thumb) =>
                      thumb.quality ===
                      THUMBNAIL_QUALITY.MEDIUM,
                  )[0].url
                }
                onClick={() => playAudio(item.videoId)}
              />
            ))}
            <Link
              className="card show-all"
              href="library"
              title="See All"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9993 29.3333C14.1549 29.3333 12.4216 28.9831 10.7993 28.2826C9.17713 27.5822 7.76602 26.6324 6.56602 25.4333C5.36602 24.2333 4.41624 22.8222 3.71668 21.2C3.01713 19.5777 2.6669 17.8444 2.66602 16C2.66602 14.1555 3.01624 12.4222 3.71668 10.8C4.41713 9.17774 5.3669 7.76663 6.56602 6.56663C7.76602 5.36663 9.17713 4.41685 10.7993 3.71729C12.4216 3.01774 14.1549 2.66751 15.9993 2.66663C17.8438 2.66663 19.5771 3.01685 21.1993 3.71729C22.8216 4.41774 24.2327 5.36752 25.4327 6.56663C26.6327 7.76663 27.5829 9.17774 28.2833 10.8C28.9838 12.4222 29.3336 14.1555 29.3327 16C29.3327 17.8444 28.9825 19.5777 28.282 21.2C27.5816 22.8222 26.6318 24.2333 25.4327 25.4333C24.2327 26.6333 22.8216 27.5835 21.1993 28.284C19.5771 28.9844 17.8438 29.3342 15.9993 29.3333ZM16.266 17.3333L15.066 18.5333C14.8216 18.7777 14.6993 19.0889 14.6993 19.4666C14.6993 19.8444 14.8216 20.1555 15.066 20.4C15.3105 20.6444 15.6216 20.7666 15.9993 20.7666C16.3771 20.7666 16.6882 20.6444 16.9327 20.4L20.3993 16.9333C20.666 16.6666 20.7994 16.3555 20.7994 16C20.7994 15.6444 20.666 15.3333 20.3993 15.0666L16.9327 11.6C16.6882 11.3555 16.3771 11.2333 15.9993 11.2333C15.6216 11.2333 15.3105 11.3555 15.066 11.6C14.8216 11.8444 14.6993 12.1555 14.6993 12.5333C14.6993 12.9111 14.8216 13.2222 15.066 13.4666L16.266 14.6666H11.9993C11.6216 14.6666 11.3051 14.7946 11.05 15.0506C10.7949 15.3066 10.6669 15.6231 10.666 16C10.666 16.3777 10.794 16.6946 11.05 16.9506C11.306 17.2066 11.6225 17.3342 11.9993 17.3333H16.266Z"
                  fill="white"
                />
              </svg>
              <span>Show All</span>
            </Link>
          </>
        ) : (
          <div className="empty-state">
            Looks like you don&apos;t have any items on your
            library yet.
          </div>
        )}
      </div>

      <h2 className="font-h3 subtitle">Favourites</h2>
      <div className="main-card-container">
        {favourites.length > 0 ? (
          <>
            {favourites.slice(0, 6).map((item) => (
              <Card
                key={item.videoId}
                title={item.title}
                duration={item.lengthSeconds.toString()}
                author={item.author}
                img={
                  item.videoThumbnails.filter(
                    (thumb) =>
                      thumb.quality ===
                      THUMBNAIL_QUALITY.MEDIUM,
                  )[0].url
                }
                onClick={() => playAudio(item.videoId)}
              />
            ))}
            <Link
              className="card show-all"
              href="favourites"
              title="See All"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9993 29.3333C14.1549 29.3333 12.4216 28.9831 10.7993 28.2826C9.17713 27.5822 7.76602 26.6324 6.56602 25.4333C5.36602 24.2333 4.41624 22.8222 3.71668 21.2C3.01713 19.5777 2.6669 17.8444 2.66602 16C2.66602 14.1555 3.01624 12.4222 3.71668 10.8C4.41713 9.17774 5.3669 7.76663 6.56602 6.56663C7.76602 5.36663 9.17713 4.41685 10.7993 3.71729C12.4216 3.01774 14.1549 2.66751 15.9993 2.66663C17.8438 2.66663 19.5771 3.01685 21.1993 3.71729C22.8216 4.41774 24.2327 5.36752 25.4327 6.56663C26.6327 7.76663 27.5829 9.17774 28.2833 10.8C28.9838 12.4222 29.3336 14.1555 29.3327 16C29.3327 17.8444 28.9825 19.5777 28.282 21.2C27.5816 22.8222 26.6318 24.2333 25.4327 25.4333C24.2327 26.6333 22.8216 27.5835 21.1993 28.284C19.5771 28.9844 17.8438 29.3342 15.9993 29.3333ZM16.266 17.3333L15.066 18.5333C14.8216 18.7777 14.6993 19.0889 14.6993 19.4666C14.6993 19.8444 14.8216 20.1555 15.066 20.4C15.3105 20.6444 15.6216 20.7666 15.9993 20.7666C16.3771 20.7666 16.6882 20.6444 16.9327 20.4L20.3993 16.9333C20.666 16.6666 20.7994 16.3555 20.7994 16C20.7994 15.6444 20.666 15.3333 20.3993 15.0666L16.9327 11.6C16.6882 11.3555 16.3771 11.2333 15.9993 11.2333C15.6216 11.2333 15.3105 11.3555 15.066 11.6C14.8216 11.8444 14.6993 12.1555 14.6993 12.5333C14.6993 12.9111 14.8216 13.2222 15.066 13.4666L16.266 14.6666H11.9993C11.6216 14.6666 11.3051 14.7946 11.05 15.0506C10.7949 15.3066 10.6669 15.6231 10.666 16C10.666 16.3777 10.794 16.6946 11.05 16.9506C11.306 17.2066 11.6225 17.3342 11.9993 17.3333H16.266Z"
                  fill="white"
                />
              </svg>
              <span>Show All</span>
            </Link>
          </>
        ) : (
          <div className="empty-state">
            Looks like you don&apos;t have any favourites
            yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default MainSection;
