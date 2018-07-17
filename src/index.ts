import Engine from './lib/engine';

const WIDTH: number = 640;
const HEIGHT: number = 480;
const CANVAS: string = 'game';

const ENGINE: Engine = setupEngine(WIDTH, HEIGHT, CANVAS);
ENGINE.start();

function setupEngine(width: number, height: number, canvasId: string): Engine {
    const engine = new Engine(width, height, document.getElementById(canvasId));

    return engine;
}
