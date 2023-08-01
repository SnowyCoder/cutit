import type { CutOptions } from "./data";


export function computeCuts(rawCuts: number[], options: CutOptions): Array<number[]> {
    const target = (options.target * 100) | 0;
    const maxPieces = options.maxPieces | 0;

    const cuts = rawCuts.map(x => ((x * 100) | 0))
    const res: Array<number[]> = [];

    let filled = Array(cuts.length);

    function step(i: number, left: number, currPieces: number) {
        if (i >= cuts.length) {
            if (left == 0) {
                res.push([...filled]);
            }
            return;
        }
        const max = Math.min((left / cuts[i]) | 0, maxPieces - currPieces);
        for (let j = max;  j >= 0; j--) {
            filled[i] = j;
            step(i + 1, left - cuts[i] * j, currPieces + j);
        }
    }
    step(0, target, 0);
    return res;
}
