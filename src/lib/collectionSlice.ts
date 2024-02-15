import { ISearchResponseDTO } from "@/types/api.types";
import { ICollection } from "@/types/collection.types";
import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: ICollection = {
  favourites: [],
  library: [],
};

const collectionSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    addToFavourites: (
      state,
      action: PayloadAction<ISearchResponseDTO>,
    ) => {
      const index = state.favourites.findIndex(
        (favItem) =>
          favItem.videoId === action.payload.videoId,
      );

      if (index === -1) {
        state.favourites.push(action.payload);
        toast.success("Successfully added to favourites");
      } else {
        toast("Already added to favourites");
      }
    },
    removeFromFavourites: (
      state,
      action: PayloadAction<ISearchResponseDTO>,
    ) => {
      const index = state.favourites.findIndex(
        (favItem) =>
          favItem.videoId === action.payload.videoId,
      );

      if (index != -1) {
        state.favourites = state.favourites.filter(
          (item) => item.videoId !== action.payload.videoId,
        );
        toast.success("Removed from favourites");
      }
    },
    addToLibrary: (
      state,
      action: PayloadAction<ISearchResponseDTO>,
    ) => {
      const index = state.library.findIndex(
        (item) => item.videoId === action.payload.videoId,
      );

      if (index === -1) {
        state.library.push(action.payload);
        toast.success("Successfully added to library");
      } else {
        toast.error("Item already in library");
      }
    },
    removeFromLibrary: (
      state,
      action: PayloadAction<ISearchResponseDTO>,
    ) => {
      const index = state.library.findIndex(
        (libItem) =>
          libItem.videoId === action.payload.videoId,
      );

      if (index != -1) {
        state.library = state.library.filter(
          (item) => item.videoId !== action.payload.videoId,
        );
        toast.success("Removed from library");
      }
    },
  },
});

export const {
  addToLibrary,
  addToFavourites,
  removeFromFavourites,
  removeFromLibrary,
} = collectionSlice.actions;

export default collectionSlice.reducer;
