import type { FlightType } from '../../../pages/Flights/types/FlightType';

export type tableType = {
  isLoading: boolean;
  heads: string[];
  rows: Array<FlightType>;
  bookmarks: string;
  setBookmarks: React.Dispatch<React.SetStateAction<string>>;
};
