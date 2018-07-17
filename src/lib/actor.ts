import Stage from './stage';

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
     * The actors layer
     */
    public layer: number;

    /**
     * Marked for removal from stage.
     */
    public remove: boolean;

    /**
     * The stage the actor is currently on.
     */
    private stage: Stage;

    /**
     * Actor constructor.
     */
    protected constructor(options: ActorOptions) {
        this.layer = options.layer ? options.layer : 0;
        this.stage = options.stage ? options.stage : undefined;
        this.remove = false;
    }

    /**
     * Set the stage the actor is on.
     * @param {Stage} stage
     */
    public setStage(stage: Stage): void {
        this.stage = stage;
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
    public abstract render(): void;

    /**
     * Draw the debug version of the actor.
     */
    public abstract debugDraw(): void;
}
