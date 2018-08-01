import { default as Actor, ActorOptions } from './actor';
import { Point } from '../utils/math';

/**
 * A circle shaped actor.
 */
export default abstract class CircleActor extends Actor {
    /**
     * Radius of actor.
     */
    public r: number;

    /**
     * Constructor.
     * @param {Point} origin
     * @param {number} radius
     * @param {ActorOptions} options
     */
    protected constructor(origin: Point, radius: number, options: ActorOptions) {
        super(origin, options);
        this.r = radius;
    }

    /**
     * @inheritDoc
     */
    protected debugDraw(): void {
        const ctx = this.stage.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.debugColour;
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}
