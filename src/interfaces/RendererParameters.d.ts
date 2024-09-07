import { GLRenderingContext } from '../types/types';

/**
 * The parameters used to create a Renderer.
 *
 * @export
 * @interface RendererParameters
 * @typedef {RendererParameters}
 */
export interface RendererParameters {
    /**
     * The canvas element to render to. If not provided, a new canvas element will be created.
     *
     * @type {?HTMLCanvasElement}
     */
    canvas?: HTMLCanvasElement;
    /**
     * The WebGL rendering context to use. If not provided, a new context will be created.
     *
     * @type {?GLRenderingContext}
     */
    ctx?: GLRenderingContext;
    /** Additional custom parameters. */
    [key: string]: any;
}
