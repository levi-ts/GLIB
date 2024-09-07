import { MaterialJSON } from '../interfaces/MaterialJSON';
import { Loader } from '../loaders/Loader';
import { TextureLoader } from '../loaders/TextureLoader';

/**
 * A material is a collection of properties that can be used to define the appearance of a mesh.
 * Properties include ambient color, diffuse color, specular color, emissive color, shininess, opacity,
 * and texture coordinates.
 *
 * @export
 * @class Material
 * @typedef {Material}
 */
export class Material {
    /**
     * The ambient color of the material.
     *
     * @public
     * @type {number[]}
     */
    public ambientColor: number[];
    /**
     * The ambient intensity of the material.
     *
     * @public
     * @type {number}
     */
    public ambientIntensity: number;
    /**
     * The ambient texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public ambientMap: WebGLTexture | null;
    /**
     * The diffuse color of the material.
     *
     * @public
     * @type {number[]}
     */
    public diffuseColor: number[];
    /**
     * The diffuse intensity of the material.
     *
     * @public
     * @type {number}
     */
    public diffuseIntensity: number;
    /**
     * The diffuse texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public diffuseMap: WebGLTexture | null;
    /**
     * The specular color of the material.
     *
     * @public
     * @type {number[]}
     */
    public specularColor: number[];
    /**
     * The specular intensity of the material.
     *
     * @public
     * @type {number}
     */
    public specularIntensity: number;
    /**
     * The specular texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public specularMap: WebGLTexture | null;
    /**
     * The emissive color of the material.
     *
     * @public
     * @type {number[]}
     */
    public emissiveColor: number[];
    /**
     * The emissive intensity of the material.
     *
     * @public
     * @type {number}
     */
    public emissiveIntensity: number;
    /**
     * The emissive texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public emissiveMap: WebGLTexture | null;
    /**
     * The shininess of the material.
     *
     * @public
     * @type {number}
     */
    public shininess: number;
    /**
     * The opacity of the material.
     *
     * @public
     * @type {number}
     */
    public opacity: number;
    /**
     * The normal texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public normalMap: WebGLTexture | null;
    /**
     * The roughness texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public roughnessMap: WebGLTexture | null;
    /**
     * The environment texture of the material.
     *
     * @public
     * @type {(WebGLTexture | null)}
     */
    public environmentMap: WebGLTexture | null;

    /**
     * Creates an instance of Material.
     *
     * @constructor
     * @param {MaterialJSON} [parameters1={}]
     * @param {MaterialJSON\} [parameters2={\}]
     */
    constructor(public parameters1: MaterialJSON = {}, public parameters2: MaterialJSON = {}) {
        this.ambientColor = this.removeAlpha(parameters1.ambientColor ?? [1, 1, 1]);
        this.ambientIntensity = parameters1.ambientIntensity ?? 1;
        this.ambientMap = typeof parameters1.ambientMap === 'string' ? new Loader().loadTexture(parameters1.ambientMap) : parameters1.ambientMap ?? new TextureLoader().null();

        this.diffuseColor = this.removeAlpha(parameters1.diffuseColor ?? [1, 1, 1]);
        this.diffuseIntensity = parameters1.diffuseIntensity ?? 1;
        this.diffuseMap = typeof parameters1.diffuseMap === 'string' ? new Loader().loadTexture(parameters1.diffuseMap) : parameters1.diffuseMap ?? new TextureLoader().null();

        this.specularColor = this.removeAlpha(parameters1.specularColor ?? [1, 1, 1]);
        this.specularIntensity = parameters1.specularIntensity ?? 1;
        this.specularMap = typeof parameters1.specularMap === 'string' ? new Loader().loadTexture(parameters1.specularMap) : parameters1.specularMap ?? new TextureLoader().null();

        this.emissiveColor = this.removeAlpha(parameters1.emissiveColor ?? [1, 1, 1]);
        this.emissiveIntensity = parameters1.emissiveIntensity ?? 1;
        this.emissiveMap = typeof parameters1.emissiveMap === 'string' ? new Loader().loadTexture(parameters1.emissiveMap) : parameters1.emissiveMap ?? new TextureLoader().null();

        this.shininess = parameters1.shininess ?? 20;
        this.opacity = parameters1.opacity ?? 1;

        this.normalMap = typeof parameters1.normalMap === 'string' ? new Loader().loadTexture(parameters1.normalMap) : parameters1.normalMap ?? null;
        this.roughnessMap = typeof parameters1.roughnessMap === 'string' ? new Loader().loadTexture(parameters1.roughnessMap) : parameters1.roughnessMap ?? null;
        this.environmentMap = typeof parameters1.environmentMap === 'string' ? new Loader().loadTextureCube(parameters1.environmentMap) : parameters1.environmentMap ?? null;

        Object.assign(this, parameters2);
    }

    /**
     * Removes the alpha channel from a color.
     *
     * @private
     * @param {number[]} color The color to remove the alpha channel from.
     * @returns {number[]} The color without the alpha channel.
     */
    private removeAlpha(color: number[]): number[] {
        return color.length === 4 ? color.slice(0, 3) : color;
    }
}
