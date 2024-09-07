import { globalRegistry, Model } from '../index';
import { Matrix4 } from '../math/Matrix4';
import { randomUUID } from '../utils/randomUUID';
import { UUID } from '../types/types';
import { toRadian } from '../utils/utils';
import { Camera } from './Camera';

/**
 * A perspective camera.
 *
 * @export
 * @class PerspectiveCamera
 * @typedef {PerspectiveCamera}
 * @extends {Camera}
 */
export class PerspectiveCamera extends Camera {
    /**
     * The projection matrix of the camera.
     *
     * @public
     * @type {Matrix4}
     */
    public matProj: Matrix4;

    /**
     * The uuid of the camera.
     *
     * @public
     * @type {UUID}
     */
    public uuid: UUID;

    /**
     * Creates an instance of PerspectiveCamera.
     *
     * @constructor
     * @param {number} fov The vertical field of view of the camera in degrees.
     * @param {number} aspect The aspect ratio of the camera.
     * @param {number} near The near clipping plane of the camera.
     * @param {number} far The far clipping plane of the camera.
     */
    constructor(public fov: number, public aspect: number, public near: number, public far: number) {
        super();

        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;

        this.matProj = new Matrix4().identity();

        this.perspective(this.matProj, toRadian(this.fov), this.aspect, this.near, this.far);

        this.uuid = randomUUID();

        globalRegistry.cameras[this.uuid] = this;
    }

    /**
     * Sets the projection matrix of the camera.
     *
     * @param {Matrix4} out The projection matrix.
     * @param {number} fovy The vertical field of view of the camera in radians.
     * @param {number} aspect The aspect ratio of the camera.
     * @param {number} near The near clipping plane of the camera.
     * @param {number} far The far clipping plane of the camera.
     * @returns {Matrix4} The projection matrix.
     */
    private perspective = (out: Matrix4, fovy: number, aspect: number, near: number, far: number) => {
        let f = 1.0 / Math.tan(fovy / 2),
            nf;
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
            nf = 1 / (near - far);
            out[10] = (far + near) * nf;
            out[14] = 2 * far * near * nf;
        } else {
            out[10] = -1;
            out[14] = -2 * near;
        }
        return out;
    };

    /**
     * Updates the projection matrix of the camera.
     */
    public updatePerspective = () => {
        this.perspective(this.matProj, toRadian(this.fov), this.aspect, this.near, this.far);
    };
}
