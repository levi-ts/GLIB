import { AssimpMaterialJSON } from './AssimpMaterialJSON';
import { MaterialJSON } from './MaterialJSON';

/**
 * The JSON representation of a 3D model as exported by Assimp.
 *
 * @export
 * @interface AssimpModelJSON
 * @typedef {AssimpModelJSON}
 */
export interface AssimpModelJSON {
    /**
     * The metadata of the model like the format and version.
     *
     * @type {?{
     *         format?: string;
     *         version?: number;
     *     }\}
     */
    __metadata__?: {
        /**
         * The format of the model.
         *
         * @type {?string}
         */
        format?: string;
        /**
         * The version of the model.
         *
         * @type {?number}
         */
        version?: number;
    };
    /**
     * The root node of the scene hierarchy.
     *
     * @type {?{
     *         name?: string;
     *         transformation?: number[];
     *         children?: {
     *             name?: string;
     *             transformation?: number[];
     *             meshes?: number[];
     *         }[];
     *     }\}
     */
    rootnode?: {
        /**
         * The name of the root node.
         *
         * @type {?string}
         */
        name?: string;
        /**
         * The transformation of the root node.
         *
         * @type {?number[]}
         */
        transformation?: number[];
        /**
         * The children of the root node.
         *
         * @type {?{
         *         name?: string;
         *         transformation?: number[];
         *         meshes?: number[];
         *     }[]\}
         */
        children?: {
            /**
             * The name of the child node.
             *
             * @type {?string}
             */
            name?: string;
            /**
             * The transformation of the child node.
             *
             * @type {?number[]}
             */
            transformation?: number[];
            /**
             * The meshes of the child node.
             *
             * @type {?number[]}
             */
            meshes?: number[];
        }[];
    };
    /**
     * The flags of the model.
     *
     * @type {?number}
     */
    flags?: number;
    /**
     * The meshes of the model.
     *
     * @type {AssimpMeshJSON[]}
     */
    meshes: AssimpMeshJSON[];
    /**
     * The materials of the model.
     *
     * @type {(AssimpMaterialJSON[]|MaterialJSON[])}
     */
    materials: AssimpMaterialJSON[] | MaterialJSON[];
    /**
     * The lights of the model.
     *
     * @type {?{
     *         name?: string;
     *         type?: number;
     *         attenuationconstant?: number;
     *         attenuationlinear?: number;
     *         attenuationquadratic?: number;
     *         diffusecolor?: number[];
     *         specularcolor?: number[];
     *         ambientcolor?: number[];
     *         direction?: number[];
     *         position?: number[];
     *     }[]\}
     */
    lights?: {
        /**
         * The name of the light.
         *
         * @type {?string}
         */
        name?: string;
        /**
         * The type of the light.
         *
         * @type {?number}
         */
        type?: number;
        /**
         * The attenuation constant of the light.
         *
         * @type {?number}
         */
        attenuationconstant?: number;
        /**
         * The attenuation linear of the light.
         *
         * @type {?number}
         */
        attenuationlinear?: number;
        /**
         * The attenuation quadratic of the light.
         *
         * @type {?number}
         */
        attenuationquadratic?: number;
        /**
         * The diffuse color of the light.
         *
         * @type {?number[]}
         */
        diffusecolor?: number[];
        /**
         * The specular color of the light.
         *
         * @type {?number[]}
         */
        specularcolor?: number[];
        /**
         * The ambient color of the light.
         *
         * @type {?number[]}
         */
        ambientcolor?: number[];
        /**
         * The direction of the light.
         *
         * @type {?number[]}
         */
        direction?: number[];
        /**
         * The position of the light.
         *
         * @type {?number[]}
         */
        position?: number[];
    }[];
    /**
     * The cameras of the model.
     *
     * @type {?{
     *         name?: string;
     *         aspect?: number;
     *         clipplanefar?: number;
     *         clipplanenear?: number;
     *         horizontalfov?: number;
     *         up?: number[];
     *         lookAt?: number[];
     *     }[]\}
     */
    cameras?: {
        /**
         * The name of the camera.
         *
         * @type {?string}
         */
        name?: string;
        /**
         * The aspect ratio of the camera.
         *
         * @type {?number}
         */
        aspect?: number;
        /**
         * The far clipping plane of the camera.
         *
         * @type {?number}
         */
        clipplanefar?: number;
        /**
         * The near clipping plane of the camera.
         *
         * @type {?number}
         */
        clipplanenear?: number;
        /**
         * The horizontal field of view of the camera.
         *
         * @type {?number}
         */
        horizontalfov?: number;
        /**
         * The up vector of the camera.
         *
         * @type {?number[]}
         */
        up?: number[];
        /**
         * The look at vector of the camera.
         *
         * @type {?number[]}
         */
        lookAt?: number[];
    }[];
}
