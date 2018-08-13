/**
 * Image Loader singleton.
 * Singleton pattern;  http://www.adam-bien.com/roller/abien/entry/singleton_pattern_in_es6_and
 */
export default class ImageLoader {
    /**
     * The singleton instance.
     */
    private static instance: ImageLoader;

    private numOfImages: number;
    private numComplete: number;
    private images: { [key: string]: HTMLImageElement };

    /**
     * Constructor.
     * @returns {ImageLoader} instance if already initialized
     */
    constructor() {
        if (ImageLoader.instance) {
            return ImageLoader.instance;
        }

        this.numOfImages = 0;
        this.numComplete = 0;
        this.images = {};
        ImageLoader.instance = this;
    }

    /**
     * Load an img and assign it to a given key.
     * @param key the key for the img
     * @param src the src for the img
     */
    public loadImage(key: string, src: string) {
        this.numOfImages++;
        const downloadingImage = new Image();
        downloadingImage.onload = () => {
            ImageLoader.instance.images[key] = downloadingImage;
            ImageLoader.instance.numComplete++;
        };
        downloadingImage.src = src;
    }

    /**
     * Get the img associated with the given key.
     * @param {string} key - the key for the img
     * @returns {Image}
     */
    public getImage(key: string): HTMLImageElement {
        const image = this.images[key];
        if (image instanceof Image) {
            return image;
        }
        throw new Error(key + ' is not a valid key');
    }

    /**
     * Get percentage of assets loaded.
     * @returns {number} percentage of load loading completed
     */
    public getProgress(): number {
        return this.numComplete / this.numOfImages;
    }

    /**
     * Check whether loading is complete.
     * @returns {boolean} true if loading is done.
     */
    public loadingIsCompleted(): boolean {
        if (this.numOfImages === 0) {
            return true;
        }
        return this.getProgress() === 1;
    }
}
