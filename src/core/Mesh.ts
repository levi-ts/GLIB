import { Geometry } from '../geometries/Geometry';
import { Material } from '../materials/Material';

/**
 * A mesh is an object which is composed of a geometry and a material.
 *
 * @export
 * @class Mesh
 * @typedef {Mesh}
 */
export class Mesh {
    /**
     * Creates an instance of Mesh.
     *
     * @constructor
     * @param {Geometry} geometry The geometry of the mesh.
     * @param {Material} material The material of the mesh.
     */
    constructor(public geometry: Geometry, public material: Material) {
        this.geometry = geometry;
        this.material = material;
    }
}
