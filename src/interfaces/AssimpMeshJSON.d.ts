/**
 * The JSON representation of a 3D mesh as exported by Assimp.
 *
 * @export
 * @interface AssimpMeshJSON
 * @typedef {AssimpMeshJSON}
 */
export interface AssimpMeshJSON {
    /**
     * The name of the mesh. This is optional.
     *
     * @type {?string}
     */
    name?: string;
    /**
     * The index of the material of the mesh in the array of materials.
     *
     * @type {number}
     */
    materialindex: number;
    /**
     * The types of primitives used in the mesh.
     * For example, if the mesh is a triangle list, this is 4.
     * If the mesh is a triangle strip, this is 5.
     * If the mesh is a triangle fan, this is 6.
     * If the mesh is a point list, this is 1.
     * If the mesh is a line list, this is 2.
     * If the mesh is a line strip, this is 3.
     * If the mesh is a custom primitive, this is 0.
     * If this is omitted, the mesh is assumed to be a triangle list.
     *
     * @type {?number}
     */
    primitivetypes?: number;
    /**
     * The array of vertices of the mesh.
     * Each vertex is represented by 3 floats.
     *
     * @type {number[]}
     */
    vertices: number[];
    /**
     * The array of normals of the mesh.
     * Each normal is represented by 3 floats.
     *
     * @type {number[]}
     */
    normals: number[];
    /**
     * The number of UV components of each texture coordinate.
     * This is only used if the mesh has texture coordinates.
     * If this is omitted, it is assumed to be 2 (i.e. 2D texture coordinates).
     * If this is 1, it means the mesh has 1D texture coordinates.
     * If this is 3, it means the mesh has 3D texture coordinates.
     * If this is 4, it means the mesh has 4D texture coordinates.
     *
     * @type {?number[]}
     */
    numuvcomponents?: number[];
    /**
     * The array of texture coordinates of the mesh.
     * Each texture coordinate is represented by 1, 2, 3 or 4 floats, depending on the value of numuvcomponents.
     * If this is omitted, it is assumed that the mesh has no texture coordinates.
     *
     * @type {?number[][]}
     */
    texturecoords?: number[][];
    /**
     * The array of faces of the mesh.
     * Each face is represented by a list of indices into the array of vertices.
     * The number of indices is equal to the value of primitivetypes.
     *
     * @type {number[][]}
     */
    faces: number[][];
}
