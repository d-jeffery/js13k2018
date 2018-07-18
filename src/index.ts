import CircleActor from './lib/actors/circ_actor';
import Engine from './lib/engine';
import Stage from './lib/stage';

const WIDTH: number = 640;
const HEIGHT: number = 480;
const CANVAS: string = 'game';

const ENGINE: Engine = setupEngine(WIDTH, HEIGHT, CANVAS);
ENGINE.start();

function setupEngine(width: number, height: number, canvasId: string): Engine {
    const engine = new Engine(width, height, document.getElementById(canvasId));
    const stage = new Stage(width, height);
    engine.setStage(stage);

    stage.addActor(new CircleActor({ x: 0, y: 0 }, 20, {}));

    return engine;
}
