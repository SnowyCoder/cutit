import type { CutOptions } from "./data";


const MAX_REPORTED = 100;


export function computeCuts(rawCuts: number[], options: CutOptions): Array<number[]> {
    const target = Math.round(options.target * 100) | 0;
    const maxPieces = options.maxPieces | 0;

    if (target <= 0 || maxPieces <= 0) return [];

    const sortedCuts = rawCuts.map((x, i) => [(Math.round(x * 100) | 0), i]);
    sortedCuts.sort((a, b) => a[0] < b[0] ? 1 : -1)
            // positive and unique
            .filter(x => x[0] > 0 && rawCuts.indexOf(x[1]) == x[0]);

    const cuts = sortedCuts.map(x => x[0]);

    const res: Array<number[]> = [];

    let filled = Array(cuts.length);

    function savePositions(): void {
        let orig = Array(filled.length);
        for (let i = 0; i < filled.length; i++) {
            orig[sortedCuts[i][1]] = filled[i];
        }
        res.push(orig);
    }

    function step(i: number, left: number, currPieces: number): void {
        if (i >= cuts.length) {
            if (left == 0) {
                savePositions()
                if (res.length >= MAX_REPORTED) {
                    throw new Error("Limit recursion");
                }
            }
            return;
        }
        const val = cuts[i];
        if (left > (maxPieces - currPieces) * val) {
            return;// Upper bound check
        }
        const max = Math.min((left / val) | 0, maxPieces - currPieces);
        for (let j = max; j >= 0; j--) {
            filled[i] = j;
            step(i + 1, left - val * j, currPieces + j);
        }
    }
    try {
        step(0, target, 0);
    } catch (e) { }
    return res;
}
