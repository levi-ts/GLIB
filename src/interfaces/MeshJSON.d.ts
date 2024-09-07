/**
 * The JSON representation of a mesh.
 *
 * @export
 * @interface MeshJSON
 * @typedef {MeshJSON}
 */
export interface MeshJSON {
    /**
     * The name of the mesh.
     *
     * @type {string}
     */
    name: string;
    /**
     * The index of the material in the materials array.
     *
     * @type {number}
     */
    materialindex: number;
    /**
     * The vertices of the mesh.
     *
     * @type {number[]}
     */
    vertices: number[];
    /**
     * The normals of the mesh.
     *
     * @type {number[]}
     */
    normals: number[];
    /**
     * The texture coordinates of the mesh.
     *
     * @type {?number[][]}
     */
    texturecoords?: number[][];
    /**
     * The faces of the mesh.
     *
     * @type {number[][]}
     */
    faces: number[][];
}
