import { AssimpPropertyJSON } from './AssimpPropertyJSON';

/**
 * A material is an object which contains a list of properties.
 *
 * @export
 * @interface AssimpMaterialJSON
 * @typedef {AssimpMaterialJSON}
 */
export interface AssimpMaterialJSON {
    /**
     * A list of properties which are associated with the material.
     *
     * @type {AssimpPropertyJSON[]}
     */
    properties: AssimpPropertyJSON[];
}
