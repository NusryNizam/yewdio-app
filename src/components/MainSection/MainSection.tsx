"use client";

import Header from "@/app/_components/header/Header";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import { useAppSelector } from "@/lib/hooks";
import { selectCollection } from "@/selectors/collection.selector";
import { THUMBNAIL_QUALITY } from "@/types/api.types";
import Link from "next/link";
import Card from "../Card/Card";
import EmptyState from "../EmptyState/EmptyState";
import "./MainSection.scss";

import { Metadata } from "next";
import Image from "next/image";
import RightArrowIcon from "../../../public/icons/icon-right-arrow.svg";

export const metadata: Metadata = {
  title: 'Yewdio | Home',
};

const MainSection = () => {
  const { library, favourites } = useAppSelector(
    selectCollection,
  );
  const { playAudio } = useFetchDetails();

  return (
    <section className="main-section">
      <Header heading="Home" />
      <h2 className="font-body-lg-md subtitle">
        Your Library
      </h2>
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
              <Image src={RightArrowIcon} alt="Show all" />
              <span>Show All</span>
            </Link>
          </>
        ) : (
          <EmptyState
            message="Looks like you don't have any items on your
          library yet."
          />
        )}
      </div>

      <h2 className="font-body-lg-md subtitle">
        Favourites
      </h2>
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
              <Image src={RightArrowIcon} alt="Show all" />
              <span>Show All</span>
            </Link>
          </>
        ) : (
          <EmptyState
            message="Looks like you don't have any favourites
          yet."
          />
        )}
      </div>
    </section>
  );
};

export default MainSection;
