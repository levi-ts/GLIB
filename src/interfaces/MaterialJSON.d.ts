/**
 * A material JSON object.
 *
 * @export
 * @interface MaterialJSON
 * @typedef {MaterialJSON}
 */
export interface MaterialJSON {
    /**
     * The ambient color of the material.
     *
     * @type {?number[]} The ambient color as an array of 3 numbers in the range of 0 to 1 for each component.
     */
    ambientColor?: number[];
    /**
     * The intensity of the ambient color.
     *
     * @type {?number} The intensity of the ambient color in the range of 0 to 1.
     */
    ambientIntensity?: number;
    /**
     * The ambient texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The ambient texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    ambientMap?: string | WebGLTexture | null;
    /**
     * The diffuse color of the material.
     *
     * @type {?number[]} The diffuse color as an array of 3 numbers in the range of 0 to 1 for each component.
     */
    diffuseColor?: number[];
    /**
     * The intensity of the diffuse color.
     *
     * @type {?number} The intensity of the diffuse color in the range of 0 to 1.
     */
    diffuseIntensity?: number;
    /**
     * The diffuse texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The diffuse texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    diffuseMap?: string | WebGLTexture | null;
    /**
     * The specular color of the material.
     *
     * @type {?number[]} The specular color as an array of 3 numbers in the range of 0 to 1 for each component.
     */
    specularColor?: number[];
    /**
     * The intensity of the specular color.
     *
     * @type {?number} The intensity of the specular color in the range of 0 to 1.
     */
    specularIntensity?: number;
    /**
     * The specular texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The specular texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    specularMap?: string | WebGLTexture | null;
    /**
     * The emissive color of the material.
     *
     * @type {?number[]} The emissive color as an array of 3 numbers in the range of 0 to 1 for each component.
     */
    emissiveColor?: number[];
    /**
     * The intensity of the emissive color.
     *
     * @type {?number} The intensity of the emissive color in the range of 0 to 1.
     */
    emissiveIntensity?: number;
    /**
     * The emissive texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The emissive texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    emissiveMap?: string | WebGLTexture | null;
    /**
     * The shininess of the material.
     *
     * @type {?number} The shininess of the material in the range of 0 to 100.
     */
    shininess?: number;
    /**
     * The opacity of the material.
     *
     * @type {?number} The opacity of the material in the range of 0 to 1.
     */
    opacity?: number;
    /**
     * The normal texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The normal texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    normalMap?: string | WebGLTexture | null;
    /**
     * The roughness texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The roughness texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    roughnessMap?: string | WebGLTexture | null;
    /**
     * The environment texture of the material.
     *
     * @type {?(string|WebGLTexture|null)} The environment texture as a string URL to a texture file, a WebGLTexture object, or null if no texture is specified.
     */
    environmentMap?: string | WebGLTexture | null;
}
