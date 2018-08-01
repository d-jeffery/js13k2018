import Stage from './stage';

/**
 * The game engine.
 */
export default class Engine {
    /**
     * Width of the game canvas.
     */
    public w: number;

    /**
     * Height of the game canvas.
     */
    public h: number;

    /**
     * Flag if we are running.
     */
    public running: boolean;

    /**
     * The last frame number.
     */
    public currentTime: number;

    /**
     * The game canvas.
     */
    private canvas: HTMLCanvasElement;

    /**
     * The 2D canvas context.
     */
    private ctx: CanvasRenderingContext2D;

    /**
     * Current stage.
     */
    private stage: Stage;

    /**
     * Stage transition function.
     */
    private transitionFun: () => void;

    /**
     * Engine constructor.
     * @param {number} width
     * @param {number} height
     * @param {HTMLElement} canvas
     */
    public constructor(width: number, height: number, canvas: HTMLElement) {
        this.w = width;
        this.h = height;

        this.canvas = canvas as HTMLCanvasElement;
        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.ctx = this.canvas.getContext('2d');
        this.stage = undefined;
    }

    /**
     * Set the current stage.
     * @param {Stage} stage
     */
    public setStage(stage: Stage): void {
        this.stage = stage;
        this.stage.ctx = this.ctx;
        this.stage.init();
    }

    /**
     * Set a stage transition function.
     * @param {() => void} fun
     */
    public setStageTransition(fun: () => void): void {
        this.transitionFun = fun;
    }

    /**
     * Start the game engine.
     */
    public start(): void {
        this.running = true;

        const engine = this;
        function tick() {
            const timeNow = Date.now();
            const dt = timeNow - engine.currentTime;
            engine.currentTime = timeNow;

            if (engine.running) {
                engine.update(dt / 1000);
            }
            engine.render();

            window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
    }

    /**
     * Stop the game engine.
     */
    public stop(): void {
        this.running = false;
    }

    /**
     * Update function.
     * @param {number} dt
     */
    private update(dt: number): void {
        // Run transition function if currentStage is marked as 'finished'
        if (this.stage.finished && this.transitionFun !== undefined) {
            this.transitionFun();
        }

        // Update stage
        if (this.stage !== undefined) {
            this.stage.update(dt);
        }
    }

    /**
     * Render function.
     */
    private render(): void {
        // Clear reset canvas
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        // Render stage
        if (this.stage !== undefined) {
            this.stage.render();
        }
    }
}
