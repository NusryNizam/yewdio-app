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
}
