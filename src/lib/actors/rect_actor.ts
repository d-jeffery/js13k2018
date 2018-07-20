import { default as Actor, ActorOptions } from './actor';
import { Point } from '../utils/math';

/**
 * A circle shaped actor.
 */
export default abstract class RectangleActor extends Actor {
    /**
     * Actor width.
     */
    public width: number;

    /**
     * Actor height.
     */
    public height: number;

    /**
     * Constructor.
     * @param origin Point of origin
     * @param width the w
     * @param height the h
     * @param options the actor options.
     */
    protected constructor(
        origin: Point,
        width: number,
        height: number,
        options: ActorOptions = {}
    ) {
        super(origin, options);
        this.width = width;
        this.height = height;
    }

    /**
     * @inheritDoc
     */
    protected drawDebug() {
        const ctx = this.stage.ctx;
        ctx.strokeStyle = this.debugColour;
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}
