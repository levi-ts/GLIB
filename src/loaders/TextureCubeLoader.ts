import { Renderer } from '../core/Renderer';
import { globalRegistry } from '../index';

/**
 * The TextureCubeLoader class is a utility class for loading cube map textures from a given URL.
 *
 * @export
 * @class TextureCubeLoader
 * @typedef {TextureCubeLoader}
 */
export class TextureCubeLoader {
    /**
     * Loads a cube map texture from a given URL.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    public load(url: string, onload?: () => void) {
        const gl = (Object.values(globalRegistry.renderers)[0] as Renderer).gl;

        const faces = [
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, url: `${url}/posx.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, url: `${url}/negx.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, url: `${url}/posy.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, url: `${url}/negy.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, url: `${url}/posz.jpg` },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, url: `${url}/negz.jpg` },
        ];

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

        faces.forEach((face) => {
            const { target, url } = face;
            const image = new Image();
            image.src = url;
            image.onload = () => {
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.generateMipmap(gl.TEXTURE_CUBE_MAP);

                if (onload) onload();
            };
        });

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, 32882, gl.CLAMP_TO_EDGE);

        return texture;
    }
}
