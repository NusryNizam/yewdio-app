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
      } else {
        console.log("Already added");
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
        toast.error("Already in library");
      }
    },
  },
});

export const { addToLibrary, addToFavourites } =
  collectionSlice.actions;

export default collectionSlice.reducer;
