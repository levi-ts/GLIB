import { AssimpMaterialJSON } from '../interfaces/AssimpMaterialJSON';
import { AssimpModelJSON } from '../interfaces/AssimpModelJSON';
import { getPropertyValue } from '../utils/getPropertyValue';
import { MaterialJSON } from '../interfaces/MaterialJSON';

/**
 * The ModelLoader class is a utility class for loading 3D models from a given URL.
 *
 * @export
 * @class ModelLoader
 * @typedef {ModelLoader}
 */
export class ModelLoader {
    /**
     * Loads a 3D model from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {AssimpModelJSON} A promise containing the loaded model.
     */
    public async load(url: string): Promise<AssimpModelJSON> {
        const response = await fetch(url);
        const model: AssimpModelJSON = await response.json();

        const materials: MaterialJSON[] = [];

        for (let i = 0; i < model.materials.length; i++) {
            const material = model.materials[i] as AssimpMaterialJSON;

            materials[i] = {
                ambientColor: getPropertyValue(material, '$clr.ambient', [1, 1, 1]) as number[],
                ambientIntensity: 1,
                ambientMap: getPropertyValue(material, '$raw.AmbientColor|file', null) as string | null,
                diffuseColor: getPropertyValue(material, '$clr.diffuse', [1, 1, 1]) as number[],
                diffuseIntensity: 1,
                diffuseMap: getPropertyValue(material, '$raw.DiffuseColor|file', null) as string | null,
                specularColor: getPropertyValue(material, '$clr.specular', [1, 1, 1]) as number[],
                specularIntensity: 1,
                specularMap: getPropertyValue(material, '$raw.SpecularColor|file', null) as string | null,
                emissiveColor: getPropertyValue(material, '$clr.emissive', [1, 1, 1]) as number[],
                emissiveIntensity: 1,
                emissiveMap: getPropertyValue(material, '$raw.EmissiveColor|file', null) as string | null,
                shininess: getPropertyValue(material, '$mat.shininess', 20) as number,
                opacity: getPropertyValue(material, '$mat.opacity', 1) as number,
                normalMap: getPropertyValue(material, '$raw.NormalMap|file', null) as string | null,
                roughnessMap: getPropertyValue(material, '$raw.ShininessExponent|file', null) as string | null,
                environmentMap: null,
            };
        }

        model.materials = materials;

        return model;
    }
}
