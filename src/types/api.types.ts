import { AUDIO_QUALITY } from "./data.types";

export interface ISearchResponseDTO {
  type: AUDIO_TYPES;
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  authorUrl?: string;
  authorVerified?: boolean;
  videoThumbnails: IVideoThumbs[];
  lengthSeconds: number;
  description?: string;
  descriptionHtml?: string;
  viewCount?: number;
  viewCountText?: string;
  published?: number;
  publishedText?: string;
  liveNow?: boolean;
  premium?: boolean;
  isUpcoming?: boolean;
}

export enum AUDIO_TYPES {
  VIDEO = "video",
  PLAYLIST = "playlist",
  CHANNEL = "channel",
}

interface IVideoThumbs {
  quality: THUMBNAIL_QUALITY;
  url: string;
  width: number;
  height: number;
}

export enum THUMBNAIL_QUALITY {
  MAXRES = "maxres", // 1280x720
  MAXRESDEFAULT = "maxresdefault", // 1280x720
  SDDEFAULT = "sddefault", // 640x480
  HIGH = "high", // 480x360
  MEDIUM = "medium", // 320x180
  DEFAULT = "default", // 120x90
  START = "start", // 120x90
  MIDDLE = "middle", // 120x90
  END = "end", // 120x90
}

export interface IAudioDetailsResponseDTO {
  title: string;
  videoId: string;
  videoThumbnails: IVideoThumbs[];
  genre: string;
  author: string;
  authorId: string;
  lengthSeconds: number;
  adaptiveFormats: IAdaptiveFormat[];
  recommendedVideos: IRecommendedVideo[];
}

interface IAdaptiveFormat {
  index: string;
  bitrate: string;
  init: string;
  url: string;
  itag: string;
  type: string;
  clen: string;
  lmt: string;
  projectionType: number;
  container: string;
  encoding: string;
  audioQuality: AUDIO_QUALITY;
}

interface IRecommendedVideo {
  videoId: string;
  title: string;
  videoThumbnails: IVideoThumbs[];
  author: string;
  lengthSeconds: number;
}

export type InvidiousData = [
  string,
  {
    cors: boolean;
    api: boolean;
    type: string;
    uri: string;
  },
];

export type Instances = {
  cors: boolean;
  api: boolean;
  type: string;
  uri: string;
};
