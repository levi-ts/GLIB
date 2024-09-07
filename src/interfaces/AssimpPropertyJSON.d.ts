/**
 * Represents a property of a 3D object as exported by Assimp.
 *
 * @export
 * @interface AssimpPropertyJSON
 * @typedef {AssimpPropertyJSON}
 */
export interface AssimpPropertyJSON {
    /**
     * The key of the property (e.g. "NAME", "TEXCOORD", "NORMAL", etc.).
     *
     * @type {string}
     */
    key: string;
    /**
     * The semantic of the property (e.g. aiPT_BASE, aiPT_NORMAL, aiPT_TEXCOORD, etc.).
     *
     * @type {?number}
     */
    semantic?: number;
    /**
     * The index of the property (e.g. the index of the texture coordinate set).
     *
     * @type {?number}
     */
    index?: number;
    /**
     * The type of the property (e.g. aiPT_FLOAT, aiPT_INT, aiPT_UINT, etc.).
     *
     * @type {?number}
     */
    type?: number;
    /**
     * The value of the property as a string, number or array of numbers.
     *
     * @type {(string|number|number[])}
     */
    value: string | number | number[];
}
