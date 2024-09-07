import { AssimpMaterialJSON } from '../interfaces/AssimpMaterialJSON';
import { AssimpPropertyJSON } from '../interfaces/AssimpPropertyJSON';

/**
 * Retrieves a property value from a given material.
 *
 * @export
 * @param {AssimpMaterialJSON} material The material to retrieve the property from.
 * @param {string} key The key of the property to retrieve.
 * @param {(string | number | number[] | null)} [def=null] The default value to return if the property is not found.
 * @returns {(string | number | number[] | null)} The value of the property or the default value if not found.
 */
export function getPropertyValue(material: AssimpMaterialJSON, key: string, def: string | number | number[] | null = null) {
    const keyProperty = material.properties.find((prop: AssimpPropertyJSON) => prop.key === key);
    const value = keyProperty ? keyProperty.value : def;

    return value;
}
