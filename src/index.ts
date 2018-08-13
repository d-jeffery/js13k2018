import CircleActor from './lib/actors/circ_actor';
import Engine from './lib/engine';
import Stage from './lib/stage';
import { ORIGIN } from './lib/utils/math';
import Controller from './lib/utils/controller';
import PreloaderStage from './lib/preloader_stage';
import ImageLoader from './lib/utils/image_loader';
import RectangleActor from './lib/actors/rect_actor';
import Sprite from './lib/sprite';

const WIDTH: number = 640;
const HEIGHT: number = 480;
const CANVAS: string = 'game';

const imageLoader = new ImageLoader();
imageLoader.loadImage('waluigis', 'assets/waluigis.png');

class Player extends RectangleActor {
    private sprite: Sprite;

    public constructor() {
        super(ORIGIN, 33, 50, {});
        this.sprite = new Sprite(imageLoader.getImage('waluigis'), 33, 50);
    }

    public init(): void {
        // Empty
        this.sprite.setCycle([[0, 1], [1, 1], [2, 1], [1, 1]], 1);
    }

    public render() {
        this.sprite.draw(this.pos, this.stage.ctx);
    }

    public update(dt: number): void {
        this.sprite.updateFrame(dt);
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

    const preloader = new PreloaderStage(width, height);
    engine.setStage(preloader);

    engine.setStageTransition(() => {
        if (engine.stage instanceof PreloaderStage) {
            const stage = new Stage(width, height);
            stage.addActor(new Player());
            engine.setStage(stage);
        }
    });

    return engine;
}
