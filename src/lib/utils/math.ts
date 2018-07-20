/**
 * Simple point structure.
 */
export interface Point {
    x: number;
    y: number;
}

/**
 * Point of origin.
 * @type {Point}
 */
export const ORIGIN: Point = { x: 0, y: 0 };

/**
 * Calculate distance between two points.
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
export function dist(pointA: Point, pointB: Point): number {
    return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
}

/**
 * Get sign of a given number.
 * @param {number} x
 * @returns {number}
 */
export function sign(x: number): number {
    return x ? (x < 0 ? -1 : 1) : 0;
}
