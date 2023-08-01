
export type CutList = number[];

export interface CutOptions {
    target: number,
    maxPieces: number,
}

export const DEFAULT_OPTIONS: CutOptions = {
    target: 1.50,
    maxPieces: 5,
}
