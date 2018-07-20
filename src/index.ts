import CircleActor from './lib/actors/circ_actor';
import Engine from './lib/engine';
import Stage from './lib/stage';
import { ORIGIN } from './lib/utils/math';
import Controller from './lib/utils/controller';

const WIDTH: number = 640;
const HEIGHT: number = 480;
const CANVAS: string = 'game';

class Player extends CircleActor {
    public constructor() {
        super(ORIGIN, 10, {});
    }

    public init(): void {
        // Empty
    }

    public update(dt: number): void {
        const controls = new Controller();
        const speed = 100 * dt;

        if (controls.isPressed(Controller.keys.W)) {
            this.pos.y -= speed;
        }

        if (controls.isPressed(Controller.keys.S)) {
            this.pos.y += speed;
        }

        if (controls.isPressed(Controller.keys.A)) {
            this.pos.x -= speed;
        }

        if (controls.isPressed(Controller.keys.D)) {
            this.pos.x += speed;
        }
    }
}

const ENGINE: Engine = setupEngine(WIDTH, HEIGHT, CANVAS);
ENGINE.start();

function setupEngine(width: number, height: number, canvasId: string): Engine {
    const engine = new Engine(width, height, document.getElementById(canvasId));
    const stage = new Stage(width, height);
    engine.setStage(stage);

    stage.addActor(new Player());

    return engine;
}
