import { ISearchResponseDTO } from "./api.types";

export interface ICollection {
  favourites: ISearchResponseDTO[];
  library: ISearchResponseDTO[];
}
