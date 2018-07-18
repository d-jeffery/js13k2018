/**
 * Simple point structure.
 */
export interface Point {
    readonly x: number;
    readonly y: number;
}

/**
 * Point of origin.
 * @type {Point}
 */
export const ORIGIN: Point = { x: 0, y: 0 };
