import { MaterialJSON } from '../interfaces/MaterialJSON';
import { ModelJSON } from '../interfaces/ModelJSON';

/**
 * A class representing a 3D model.
 *
 * @export
 * @class Model
 * @typedef {Model}
 */
export class Model {
    /**
     * Creates an instance of Model.
     *
     * @constructor
     * @param {ModelJSON} data The JSON representation of the model.
     * @param {MaterialJSON} [parameters={}] The material properties which should be applied to the model.
     */
    constructor(public data: ModelJSON, public parameters: MaterialJSON = {}) {
        this.data = data;

        for (let i = 0; i < this.data.materials.length; i++) {
            this.data.materials[i] = { ...this.data.materials[i], ...parameters };
        }
    }
}
