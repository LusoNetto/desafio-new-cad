import type { flightType } from './flightType';

export type tableType = {
  isLoading: boolean;
  heads: string[];
  rows: flightType[];
  bookmarks: string;
  setBookmarks: React.Dispatch<React.SetStateAction<string>>;
};
