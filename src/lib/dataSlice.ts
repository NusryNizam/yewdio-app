import { ISearchResponseDTO } from "@/types/api.types";
import { IResults } from "@/types/data.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: IResults = {
  isSearchingAudio: false,
  isSearchOverlay: false,
};

export const searchAudio = createAsyncThunk(
  "data/search-audio",
  async (searchTerm: string) => {
    try {
      const response = await axios.get<
        ISearchResponseDTO[]
      >(
        `https://invidious.fdn.fr/api/v1/search?q=${searchTerm}`,
      );

      return response.data;
    } catch (error) {
      console.log("ERROR");
      throw Error("Error");
    }
  },
);

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setIsSearchOverlay: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isSearchOverlay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAudio.pending, (state) => {
        state.isSearchingAudio = true;
      })
      .addCase(searchAudio.rejected, (state) => {
        state.isSearchingAudio = false;
      })
      .addCase(searchAudio.fulfilled, (state, action) => {
        state.isSearchingAudio = false;
        state.results = action.payload;
        console.log(action.payload);
      });
  },
});

export const { setIsSearchOverlay } = dataSlice.actions;
export default dataSlice.reducer;
