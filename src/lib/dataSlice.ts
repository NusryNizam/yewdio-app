import {
  IAudioDetailsResponseDTO,
  ISearchResponseDTO,
  Instances,
  InvidiousData,
} from "@/types/api.types";
import { IResults } from "@/types/data.types";
import { shuffleArray } from "@/utils/shuffleArray";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import api from "./api";
import { RootState } from "./store";

const initialState: IResults = {
  isSearchingAudio: false,
  isGettingAudioDetails: false,
  isSearchOverlay: false,
  isGettingInstances: false,

  isPlayingPlaylist: false,
  playlistIndex: [],
  instances: [],
  instanceURL: "",
};

export const searchAudio = createAsyncThunk(
  "data/search-audio",
  async (searchTerm: string, { getState }) => {
    const url = (getState() as RootState).data.instanceURL;

    try {
      const response = await api.get<ISearchResponseDTO[]>(
        `${url}/api/v1/search?q=${searchTerm}`,
      );

      return response.data;
    } catch (error) {
      throw Error("Error");
    }
  },
);

export const getAudioDetails = createAsyncThunk(
  "data/get-audio-details",
  async (vidId: string, { getState }) => {
    const url = (getState() as RootState).data.instanceURL;
    try {
      const response: AxiosResponse<IAudioDetailsResponseDTO> =
        await api.get<IAudioDetailsResponseDTO>(
          `${url}/api/v1/videos/${vidId}`,
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
      toast.error(
        "Coudn't get audio details. Please try again later",
      );
      throw new Error("Error");
    }
  },
);

export const getInstances = createAsyncThunk(
  "data/get-instances",
  async () => {
    try {
      const response: AxiosResponse<InvidiousData[]> =
        await api.get<InvidiousData[]>(
          `https://api.invidious.io/instances.json?sort_by=api`,
        );

      let transformedData: Instances[] = response.data.map(
        ([_, value]) => ({
          cors: value.cors,
          api: value.api,
          type: value.type,
          uri: value.uri,
        }),
      );

      transformedData = transformedData.filter(
        (data) =>
          data.cors && data.api && data.type === "https",
      );

      return transformedData;
    } catch (error) {
      throw new Error("Error");
    }
  },
);

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    clearPlayState: (state) => {
      state.currentIndex = 0;
      state.isPlayingPlaylist = false;
      state.playlistIndex = [];
    },
    setIsSearchOverlay: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isSearchOverlay = action.payload;
    },
    playFavouriteItems: (
      state,
      action: PayloadAction<{ length: number }>,
    ) => {
      const favCount = action.payload.length;
      if (favCount > 0) {
        let indexes = [];
        for (let i = 0; i < favCount; i++) {
          indexes.push(i);
        }
        state.playlistIndex = shuffleArray(indexes);
        state.currentIndex = 0;
        state.isPlayingPlaylist = true;
        state.currentPlaylistLength = favCount;
      }
    },
    playLibraryItems: (
      state,
      action: PayloadAction<{ length: number }>,
    ) => {
      const libCount = action.payload.length;
      if (libCount > 0) {
        let indexes = [];
        for (let i = 0; i < libCount; i++) {
          indexes.push(i);
        }
        state.playlistIndex = shuffleArray(indexes);
        state.currentIndex = 0;
        state.isPlayingPlaylist = true;
        state.currentPlaylistLength = libCount;
      }
    },
    playNextSong: (state) => {
      if (
        state.currentPlaylistLength &&
        state.currentIndex !==
          state.currentPlaylistLength - 1
      )
        state.currentIndex = (state.currentIndex ?? 0) + 1;
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
        clearPlayState();
      })
      .addCase(
        getAudioDetails.fulfilled,
        (state, action) => {
          state.isGettingAudioDetails = false;
          state.selectedAudio = action.payload;
        },
      );

    builder
      .addCase(getInstances.pending, (state) => {
        state.isGettingInstances = true;
      })
      .addCase(getInstances.rejected, (state) => {
        state.isGettingInstances = false;
      })
      .addCase(getInstances.fulfilled, (state, action) => {
        state.isGettingInstances = false;
        state.instances = action.payload;
        state.instanceURL = action.payload[0].uri;
      });
  },
});

export const {
  setIsSearchOverlay,
  playFavouriteItems,
  playNextSong,
  clearPlayState,
} = dataSlice.actions;

export default dataSlice.reducer;
