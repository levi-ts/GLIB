/**
 * A 4D vector class.
 *
 * @export
 * @class Vector4
 * @typedef {Vector4}
 * @extends {Float32Array}
 */
export class Vector4 extends Float32Array {
    /**
     * Creates an instance of Vector4.
     *
     * @constructor
     * @param {number} [x=0] The x-component of the vector.
     * @param {number} [y=0] The y-component of the vector.
     * @param {number} [z=0] The z-component of the vector.
     * @param {number} [w=0] The w-component of the vector.
     */
    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        super(4);
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this[3] = w;
    }

    /**
     * Calculates the magnitude of the vector.
     *
     * @public
     * @returns {number} The magnitude of the vector.
     */
    public magnitude(): number {
        return Math.sqrt(this[0] ** 2 + this[1] ** 2 + this[2] ** 2 + this[3] ** 2);
    }

    /**
     * Normalizes the vector.
     *
     * @public
     * @returns {this} The normalized vector.
     */
    public normalize(): this {
        const mag = this.magnitude();
        if (mag > 0) {
            this[0] /= mag;
            this[1] /= mag;
            this[2] /= mag;
            this[3] /= mag;
        }
        return this;
    }

    /**
     * Adds another vector to this vector.
     *
     * @public
     * @param {Vector4} other The vector to add.
     * @returns {this} The resulting vector.
     */
    public add(other: Vector4): this {
        this[0] += other[0];
        this[1] += other[1];
        this[2] += other[2];
        this[3] += other[3];
        return this;
    }

    /**
     * Subtracts another vector from this vector.
     *
     * @public
     * @param {Vector4} other The vector to subtract.
     * @returns {this} The resulting vector.
     */
    public subtract(other: Vector4): this {
        this[0] -= other[0];
        this[1] -= other[1];
        this[2] -= other[2];
        this[3] -= other[3];
        return this;
    }

    /**
     * Scales the vector by a scalar value.
     *
     * @public
     * @param {number} scalar The scalar to scale by.
     * @returns {this} The scaled vector.
     */
    public scale(scalar: number): this {
        this[0] *= scalar;
        this[1] *= scalar;
        this[2] *= scalar;
        this[3] *= scalar;
        return this;
    }

    /**
     * Calculates the dot product of this vector and another vector.
     *
     * @public
     * @param {Vector4} other The vector to dot with.
     * @returns {number} The dot product of the two vectors.
     */
    public dot(other: Vector4): number {
        return this[0] * other[0] + this[1] * other[1] + this[2] * other[2] + this[3] * other[3];
    }

    /**
     * Divides the vector by a scalar value.
     *
     * @public
     * @param {number} scalar The scalar to divide by.
     * @returns {this} The divided vector.
     */
    public divide(scalar: number): this {
        if (scalar !== 0) {
            this[0] /= scalar;
            this[1] /= scalar;
            this[2] /= scalar;
            this[3] /= scalar;
        } else {
            throw new Error('Cannot divide by zero');
        }
        return this;
    }
}

(Vector4.prototype as any).set = function (this: Vector4, x: number, y?: number, z?: number, w?: number): void {
    this[0] = x;
    this[1] = y ?? this[1];
    this[2] = z ?? this[2];
    this[3] = w ?? this[3];
};
