import { RootState } from "@/lib/store";

export const selectCollection = (state: RootState) =>
  state.collection;
