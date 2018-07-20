/**
 * Controller singleton.
 * Singleton pattern;  http://www.adam-bien.com/roller/abien/entry/singleton_pattern_in_es6_and
 */
export default class Controller {
    /**
     * Key map.
     */
    public static keys: { [key: string]: string };

    /**
     * The singleton instance.
     */
    private static instance: Controller;

    /**
     * Table of key presses.
     */
    private pressed: { [key: string]: boolean };

    /**
     * Constructor.
     * @returns {Controller} instance if already initialized
     */
    public constructor() {
        if (Controller.instance) {
            return Controller.instance;
        }

        this.pressed = {};

        document.addEventListener(
            'keyup',
            (event: KeyboardEvent) => {
                Controller.instance.pressed[event.code] = false;
            },
            true
        );

        document.addEventListener(
            'keydown',
            (event: KeyboardEvent) => {
                Controller.instance.pressed[event.code] = true;
            },
            true
        );

        Controller.keys = {
            W: 'KeyW',
            A: 'KeyA',
            S: 'KeyS',
            D: 'KeyD',
            UP: 'ArrowUp',
            DOWN: 'ArrowDown',
            LEFT: 'ArrowLeft',
            RIGHT: 'ArrowRight',
            SPACE: 'Space'
        };
        Controller.instance = this;
    }

    /**
     * Check if key is pressed.
     * @param {string} code
     * @returns {boolean}
     */
    public isPressed(code: string): boolean {
        const press = this.pressed[code];

        if (press !== undefined) {
            return press;
        }
        return false;
    }
}
