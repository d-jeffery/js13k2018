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
     * Stage if 'finished'.
     */
    public finished = false;

    /**
     * Width of the stage.
     */
    protected w: number;

    /**
     * Height of the stage.
     */
    protected h: number;

    /**
     * Actors on the stage.
     */
    private actors: Actor[];

    /**
     * Stage constructor.
     */
    public constructor(width: number, height: number) {
        this.w = width;
        this.h = height;
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
