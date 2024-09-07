import { Renderer } from '../core/Renderer';
import { globalRegistry } from '../index';

/**
 * TextureLoader is a class that loads and creates a WebGLTexture from a given URL.
 *
 * @export
 * @class TextureLoader
 * @typedef {TextureLoader}
 */
export class TextureLoader {
    /**
     * Loads a texture from a given URL and creates a WebGLTexture.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    public load(url: string, onload?: () => void) {
        const gl = (Object.values(globalRegistry.renderers)[0] as Renderer).gl;

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const image = new Image();
        image.src = url;
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.bindTexture(gl.TEXTURE_2D, null);

            if (onload) onload();
        };

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        return texture;
    }

    /**
     * Creates a white 1x1 texture.
     *
     * @public
     * @returns {WebGLTexture} The white 1x1 texture.
     */
    public null() {
        const gl = (Object.values(globalRegistry.renderers)[0] as Renderer).gl;

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        const whitePixel = new Uint8Array([255, 255, 255, 255]);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);

        return texture;
    }
}
