import Stage from '../stage';
import { Point } from '../utils/math';

/**
 * Actor's constructor options.
 */
export interface ActorOptions {
    readonly layer?: number;
    readonly stage?: Stage;
    readonly debugColour?: string;
}

/**
 * An actor class.
 */
export default abstract class Actor {
    /**
     * The actor's position.
     */
    public pos: Point;

    /**
     * The actor's layer.
     */
    public layer: number;

    /**
     * Marked for removal from stage.
     */
    public remove: boolean;

    /**
     * The stage the actor is currently on.
     */
    public stage: Stage;

    /**
     * The colour to draw
     */
    protected debugColour: string;

    /**
     * Actor constructor.
     */
    protected constructor(origin: Point, options: ActorOptions) {
        this.pos = origin;
        this.layer = options.layer ? options.layer : 0;
        this.stage = options.stage ? options.stage : undefined;
        this.debugColour = options.debugColour ? options.debugColour : '#000000';
        this.remove = false;
    }

    /**
     * Initialize the actor.
     */
    public abstract init(): void;

    /**
     * Update the actor.
     * @param {number} dt
     */
    public abstract update(dt: number): void;

    /**
     * Render the actor.
     */
    public render(): void {
        this.debugDraw();
    }

    /**
     * Draw the debug version of the actor.
     */
    protected abstract debugDraw(): void;
}
