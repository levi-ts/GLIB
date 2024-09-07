import { Matrix4 } from '../math/Matrix4';
import { Vector3 } from '../math/Vector3';

/**
 * Represents a camera which can be used to render a scene.
 *
 * @export
 * @class Camera
 * @typedef {Camera}
 */
export class Camera {
    /**
     * The position of the camera in the scene.
     *
     * @public
     * @type {Vector3}
     */
    public position: Vector3;
    /**
     * The view matrix of the camera.
     *
     * @public
     * @type {Matrix4}
     */
    public matView: Matrix4;

    /**
     * Creates an instance of Camera.
     *
     * @constructor
     */
    constructor() {
        this.position = new Vector3();

        this.matView = new Matrix4();
    }

    /**
     * Sets the view matrix of the camera based on the given parameters.
     *
     * @param {Matrix4} out The matrix in which the view matrix should be stored.
     * @param {Vector3} eye The position of the camera.
     * @param {Vector3} center The point the camera is looking at.
     * @param {Vector3} up The up vector of the camera.
     * @returns {Matrix4} The matrix in which the view matrix has been stored.
     */
    public lookAt = (out: Matrix4, eye: Vector3, center: Vector3, up: Vector3) => {
        return out.lookAt(eye, center, up);
    };

    /**
     * Moves the camera forward by the given velocity.
     *
     * @param {number} vel The velocity to move the camera forward.
     * @returns {this}
     */
    public moveForward = (vel: number) => {
        const forward: Vector3 = new Vector3(this.matView[2], this.matView[6], this.matView[10]);
        const direction = forward.divide(forward.magnitude());

        this.position[0] += vel * direction[0];
        this.position[1] += vel * direction[1];
        this.position[2] += vel * direction[2];

        return this;
    };

    /**
     * Moves the camera backward by the given velocity.
     *
     * @param {number} vel The velocity to move the camera backward.
     * @returns {this}
     */
    public moveBackward = (vel: number) => {
        const forward: Vector3 = new Vector3(this.matView[2], this.matView[6], this.matView[10]);
        const direction = forward.divide(forward.magnitude());

        this.position[0] -= vel * direction[0];
        this.position[1] -= vel * direction[1];
        this.position[2] -= vel * direction[2];

        return this;
    };

    /**
     * Moves the camera to the left by the given velocity.
     *
     * @param {number} vel The velocity to move the camera to the left.
     * @returns {this}
     */
    public moveLeft = (vel: number) => {
        const right: Vector3 = new Vector3(this.matView[0], this.matView[4], this.matView[8]);
        const direction = right.divide(right.magnitude());

        this.position[0] -= vel * direction[0];
        this.position[1] -= vel * direction[1];
        this.position[2] -= vel * direction[2];

        return this;
    };

    /**
     * Moves the camera to the right by the given velocity.
     *
     * @param {number} vel The velocity to move the camera to the right.
     * @returns {this}
     */
    public moveRight = (vel: number) => {
        const right: Vector3 = new Vector3(this.matView[0], this.matView[4], this.matView[8]);
        const direction = right.divide(right.magnitude());

        this.position[0] += vel * direction[0];
        this.position[1] += vel * direction[1];
        this.position[2] += vel * direction[2];

        return this;
    };

    /**
     * Moves the camera up by the given velocity.
     *
     * @param {number} vel The velocity to move the camera up.
     * @returns {this}
     */
    public moveUp = (vel: number) => {
        this.position[1] += vel;

        return this;
    };

    /**
     * Moves the camera down by the given velocity.
     *
     * @param {number} vel The velocity to move the camera down.
     * @returns {this}
     */
    public moveDown = (vel: number) => {
        this.position[1] -= vel;

        return this;
    };
}
