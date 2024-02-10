import {
  IAudioDetailsResponseDTO,
  ISearchResponseDTO,
} from "@/types/api.types";
import { IResults } from "@/types/data.types";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { api } from "./api";

const initialState: IResults = {
  isSearchingAudio: false,
  isGettingAudioDetails: false,
  isSearchOverlay: false,
  favourites: [],
  library: [],
};

export const searchAudio = createAsyncThunk(
  "data/search-audio",
  async (searchTerm: string) => {
    try {
      const response = await api.get<ISearchResponseDTO[]>(
        `https://invidious.fdn.fr/api/v1/search?q=${searchTerm}`,
      );

      return response.data;
    } catch (error) {
      throw Error("Error");
    }
  },
);

export const getAudioDetails = createAsyncThunk(
  "data/get-audio-details",
  async (vidId: string) => {
    try {
      const response: AxiosResponse<IAudioDetailsResponseDTO> =
        await api.get<IAudioDetailsResponseDTO>(
          `https://invidious.fdn.fr/api/v1/videos/${vidId}`,
        );

      const {
        title,
        videoId,
        videoThumbnails,
        genre,
        author,
        authorId,
        lengthSeconds,
        adaptiveFormats,
        recommendedVideos,
      } = response.data;

      return {
        title,
        videoId,
        videoThumbnails,
        genre,
        author,
        authorId,
        lengthSeconds,
        adaptiveFormats,
        recommendedVideos,
      };
    } catch (error) {
      throw new Error("Error");
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
      });

    builder
      .addCase(getAudioDetails.pending, (state) => {
        state.isGettingAudioDetails = true;
      })
      .addCase(getAudioDetails.rejected, (state) => {
        state.isGettingAudioDetails = false;
      })
      .addCase(
        getAudioDetails.fulfilled,
        (state, action) => {
          state.isGettingAudioDetails = false;
          state.selectedAudio = action.payload;
        },
      );
  },
});

export const {
  setIsSearchOverlay,
  addToLibrary,
  addToFavourites,
} = dataSlice.actions;
export default dataSlice.reducer;
