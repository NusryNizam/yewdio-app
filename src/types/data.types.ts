import { ISearchResponseDTO } from "./api.types";

export interface IResults {
  isSearchingAudio: boolean;
  results?: ISearchResponseDTO[];
  isSearchOverlay: boolean;
}
