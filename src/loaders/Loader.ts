import { Renderer } from '../core/Renderer';
import { globalRegistry } from '../index';
import { AssimpMaterialJSON } from '../interfaces/AssimpMaterialJSON';
import { AssimpModelJSON } from '../interfaces/AssimpModelJSON';
import { getPropertyValue } from '../utils/getPropertyValue';
import { MaterialJSON } from '../interfaces/MaterialJSON';

/**
 * A class which provides functionality for loading assets.
 *
 * @export
 * @class Loader
 * @typedef {Loader}
 */
export class Loader {
    /**
     * Loads a text file from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<string>} A promise containing the contents of the file.
     */
    public async loadText(url: string) {
        const response = await fetch(url);
        const text = await response.text();

        return text;
    }

    /**
     * Loads a 3D model from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<AssimpModelJSON>} A promise containing the loaded model.
     */
    public async loadModel(url: string) {
        const response = await fetch(url);
        const model: AssimpModelJSON = await response.json();

        const materials: MaterialJSON[] = [];

        for (let i = 0; i < model.materials.length; i++) {
            const material = model.materials[i] as AssimpMaterialJSON;

            materials[i] = {
                ambientColor: getPropertyValue(material, '$clr.ambient', [1, 1, 1]) as number[],
                ambientIntensity: 1,
                ambientMap: getPropertyValue(material, '$raw.AmbientColor|file', null) as string | null,
                diffuseColor: getPropertyValue(material, '$clr.diffuse', [1, 1, 1]) as number[],
                diffuseIntensity: 1,
                diffuseMap: getPropertyValue(material, '$raw.DiffuseColor|file', null) as string | null,
                specularColor: getPropertyValue(material, '$clr.specular', [1, 1, 1]) as number[],
                specularIntensity: 1,
                specularMap: getPropertyValue(material, '$raw.SpecularColor|file', null) as string | null,
                emissiveColor: getPropertyValue(material, '$clr.emissive', [1, 1, 1]) as number[],
                emissiveIntensity: 1,
                emissiveMap: getPropertyValue(material, '$raw.EmissiveColor|file', null) as string | null,
                shininess: getPropertyValue(material, '$mat.shininess', 20) as number,
                opacity: getPropertyValue(material, '$mat.opacity', 1) as number,
                normalMap: getPropertyValue(material, '$raw.NormalMap|file', null) as string | null,
                roughnessMap: getPropertyValue(material, '$raw.ShininessExponent|file', null) as string | null,
                environmentMap: null,
            };
        }

        model.materials = materials;

        return model;
    }

    /**
     * Loads a 2D texture from a given URL.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    public loadTexture(url: string, onload?: () => void) {
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

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        return texture;
    }

    /**
     * Loads a cube map texture from a given URL.
     *
     * @public
     * @param {string} url The URL of the texture to be loaded.
     * @param {?() => void} [onload] A callback which is called when the texture is loaded.
     * @returns {WebGLTexture} The loaded texture.
     */
    public loadTextureCube(url: string, onload?: () => void) {
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
