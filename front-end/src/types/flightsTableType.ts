import type { flightType } from './flightType';

export type tableType = {
    isLoading: boolean;
    heads: string[];
    rows: flightType[];
};
