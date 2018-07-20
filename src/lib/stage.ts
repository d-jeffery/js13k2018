import Actor from './actors/actor';

/**
 * The game stage.
 */
export default class Stage {
    /**
     * The 2D canvas context.
     */
    public ctx: CanvasRenderingContext2D;

    /**
     * Width of the stage.
     */
    private width: number;

    /**
     * Height of the stage.
     */
    private height: number;

    /**
     * Stage if 'finished'.
     */
    private finished = false;

    /**
     * Actors on the stage.
     */
    private actors: Actor[];

    /**
     * Stage constructor.
     */
    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.ctx = undefined;
        this.finished = false;
        this.actors = [];
    }

    /**
     * Add an actor to the stage and initialise.
     * @param {Actor} actor
     */
    public addActor(actor: Actor): void {
        actor.stage = this;
        actor.init();
        this.actors.push(actor);
    }

    /**
     * Initialize the stage.
     */
    public init(): void {
        this.finished = false;
    }

    /**
     * Update all actors on stage.
     * @param {number} dt
     */
    public update(dt: number): void {
        this.actors = this.actors.filter(a => !a.remove);
        this.sortActorsByLayer();

        for (const actor of this.actors) {
            actor.update(dt);
        }
    }

    /**
     * Render all actors on stage.
     */
    public render(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (const actor of this.actors) {
            actor.render();
        }
    }

    /**
     * Sort actor list by layer.
     */
    private sortActorsByLayer() {
        this.actors.sort((a, b) => {
            return a.layer - b.layer;
        });
    }
}
