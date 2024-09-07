import { MaterialJSON } from './MaterialJSON';
import { MeshJSON } from './MeshJSON';

/**
 * This interface represents the JSON representation of a 3D model.
 *
 * @export
 * @interface ModelJSON
 * @typedef {ModelJSON}
 */
export interface ModelJSON {
    /**
     * The list of meshes which are part of this model.
     * A mesh is a 3D object which is composed of vertices, normals, texture coordinates, and indices.
     *
     * @type {MeshJSON[]}
     */
    meshes: MeshJSON[];
    /**
     * The list of materials which are part of this model.
     * A material is an object which contains a list of properties.
     *
     * @type {MaterialJSON[]}
     */
    materials: MaterialJSON[];
}
