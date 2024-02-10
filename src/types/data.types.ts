import {
  IAudioDetailsResponseDTO,
  ISearchResponseDTO,
} from "./api.types";

export interface IResults {
  isSearchingAudio: boolean;
  isGettingAudioDetails: boolean;
  results?: ISearchResponseDTO[];
  selectedAudio?: IAudioDetailsResponseDTO;
  isSearchOverlay: boolean;
  favourites: ISearchResponseDTO[];
  library: ISearchResponseDTO[];
}

export enum CARD_VARIANT {
  NORMAL = "normal",
  DETAILED = "detailed",
  SINGLETON = "singleton",
}

export enum AUDIO_QUALITY {
  ULTRA_LOW = "AUDIO_QUALITY_ULTRALOW",
  LOW = "AUDIO_QUALITY_LOW",
  MEDIUM = "AUDIO_QUALITY_MEDIUM",
}
