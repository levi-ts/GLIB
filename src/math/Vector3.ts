/**
 * 3D vector class.
 *
 * @export
 * @class Vector3
 * @typedef {Vector3}
 * @extends {Float32Array}
 */
export class Vector3 extends Float32Array {
    /**
     * Creates an instance of Vector3.
     *
     * @constructor
     * @param {number} [x=0] - The x-component of the vector.
     * @param {number} [y=0] - The y-component of the vector.
     * @param {number} [z=0] - The z-component of the vector.
     */
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(3);
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }

    /**
     * Calculates the magnitude of the vector.
     *
     * @public
     * @returns {number} - The magnitude of the vector.
     */
    public magnitude(): number {
        return Math.sqrt(this[0] ** 2 + this[1] ** 2 + this[2] ** 2);
    }

    /**
     * Normalizes the vector.
     *
     * @public
     * @returns {this} - The normalized vector.
     */
    public normalize(): this {
        const mag = this.magnitude();
        if (mag > 0) {
            this[0] /= mag;
            this[1] /= mag;
            this[2] /= mag;
        }
        return this;
    }

    /**
     * Adds a vector to this vector.
     *
     * @public
     * @param {Vector3} other - The vector to add.
     * @returns {this} - The resulting vector.
     */
    public add(other: Vector3): this {
        this[0] += other[0];
        this[1] += other[1];
        this[2] += other[2];
        return this;
    }

    /**
     * Subtracts a vector from this vector.
     *
     * @public
     * @param {Vector3} other - The vector to subtract.
     * @returns {this} - The resulting vector.
     */
    public subtract(other: Vector3): this {
        this[0] -= other[0];
        this[1] -= other[1];
        this[2] -= other[2];
        return this;
    }

    /**
     * Scales the vector by a scalar value.
     *
     * @public
     * @param {number} scalar - The scalar to scale by.
     * @returns {this} - The scaled vector.
     */
    public scale(scalar: number): this {
        this[0] *= scalar;
        this[1] *= scalar;
        this[2] *= scalar;
        return this;
    }

    /**
     * Calculates the dot product of this vector and another vector.
     *
     * @public
     * @param {Vector3} other - The vector to dot with.
     * @returns {number} - The dot product of the two vectors.
     */
    public dot(other: Vector3): number {
        return this[0] * other[0] + this[1] * other[1] + this[2] * other[2];
    }

    /**
     * Calculates the cross product of this vector and another vector.
     *
     * @public
     * @param {Vector3} other - The vector to cross with.
     * @returns {Vector3} - The cross product of the two vectors.
     */
    public cross(other: Vector3): Vector3 {
        const x = this[1] * other[2] - this[2] * other[1];
        const y = this[2] * other[0] - this[0] * other[2];
        const z = this[0] * other[1] - this[1] * other[0];
        return new Vector3(x, y, z);
    }

    /**
     * Divides the vector by a scalar value.
     *
     * @public
     * @param {number} scalar - The scalar to divide by.
     * @returns {this} - The divided vector.
     */
    public divide(scalar: number): this {
        if (scalar !== 0) {
            this[0] /= scalar;
            this[1] /= scalar;
            this[2] /= scalar;
        } else {
            throw new Error('Cannot divide by zero');
        }
        return this;
    }
}

(Vector3.prototype as any).set = function (this: Vector3, x: number, y?: number, z?: number): void {
    this[0] = x;
    this[1] = y ?? this[1];
    this[2] = z ?? this[2];
};
