import { Geometry } from '../geometries/Geometry';
import { globalRegistry } from '../index';
import { Material } from '../materials/Material';
import { Matrix4 } from '../math/Matrix4';
import { Model } from '../models/Model';
import { randomUUID } from '../utils/randomUUID';
import { UUID } from '../types/types';
import { Mesh } from './Mesh';

/**
 * A scene is an object which contains a list of meshes and a world matrix.
 *
 * @export
 * @class Scene
 * @typedef {Scene}
 */
export class Scene {
    /**
     * An array of meshes which are part of the scene.
     *
     * @public
     * @type {Mesh[]}
     */
    public children: Mesh[];
    /**
     * The world matrix of the scene.
     *
     * @public
     * @type {Matrix4}
     */
    public matWorld: Matrix4;
    /**
     * The UUID of the scene.
     *
     * @public
     * @type {UUID}
     */
    public uuid: UUID;

    /**
     * Creates an instance of Scene.
     *
     * @constructor
     */
    constructor() {
        this.children = [];

        this.matWorld = new Matrix4().identity();

        this.uuid = randomUUID();

        globalRegistry.scenes[this.uuid] = this;
    }

    /**
     * Adds a mesh or a model to the scene.
     *
     * @public
     * @param {Mesh|Model} child The mesh or model which should be added to the scene.
     */
    add(child: Mesh | Model) {
        if (child instanceof Mesh) {
            this.children.push(child);
        } else if (child instanceof Model) {
            for (let i = 0; i < child.data.meshes.length; i++) {
                const geometry: Geometry = new Geometry(child.data.meshes[i]);
                const material: Material = new Material(child.data.materials[child.data.meshes[i].materialindex]);
                const mesh: Mesh = new Mesh(geometry, material);

                this.children.push(mesh);
            }
        }
    }
}
