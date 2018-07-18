import { default as Actor, ActorOptions } from './actor';
import { Point } from '../utils/math';

/**
 * A circle shaped actor.
 */
export default class CircleActor extends Actor {
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
    constructor(origin: Point, radius: number, options: ActorOptions) {
        super(origin, options);
        this.radius = radius;
    }

    /**
     * @inheritDoc
     */
    public init(): void {
        // Do nothing.
    }

    /**
     * @inheritDoc
     */
    public update(dt: number): void {
        // Do nothing
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
