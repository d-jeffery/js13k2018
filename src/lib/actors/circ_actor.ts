import { default as Actor, ActorOptions } from './actor';
import { Point } from '../utils/math';

/**
 * A circle shaped actor.
 */
export default abstract class CircleActor extends Actor {
    /**
     * Radius of actor.
     */
    public radius: number;

    /**
     * Constructor.
     * @param {Point} origin
     * @param {number} radius
     * @param {ActorOptions} options
     */
    protected constructor(origin: Point, radius: number, options: ActorOptions) {
        super(origin, options);
        this.radius = radius;
    }

    /**
     * @inheritDoc
     */
    protected debugDraw(): void {
        const ctx = this.stage.ctx;
        ctx.beginPath();
        ctx.fillStyle = this.debugColour;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
