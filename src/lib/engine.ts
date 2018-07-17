import Stage from './stage';

/**
 * The game engine.
 */
export default class Engine {
    /**
     * Width of the game canvas.
     */
    public width: number;

    /**
     * Height of the game canvas.
     */
    public height: number;

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
        this.width = width;
        this.height = height;

        this.canvas = canvas as HTMLCanvasElement;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext('2d');
        this.stage = undefined;
    }

    /**
     * Set the current stage.
     * @param {Stage} stage
     */
    public setStage(stage: Stage): void {
        this.stage = stage;
        this.stage.setCtx(this.ctx);
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
        console.log(dt);

        if (this.stage !== undefined) {
            this.stage.update(dt);
        }
    }

    /**
     * Render function.
     */
    private render(): void {
        if (this.stage !== undefined) {
            this.stage.render();
        }
    }
}
