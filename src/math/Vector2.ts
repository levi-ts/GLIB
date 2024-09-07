/**
 * 2D vector class.
 *
 * @export
 * @class Vector2
 * @typedef {Vector2}
 * @extends {Float32Array}
 */
export class Vector2 extends Float32Array {
    /**
     * Creates an instance of Vector2.
     *
     * @constructor
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    constructor(x: number = 0, y: number = 0) {
        super(2);
        this[0] = x;
        this[1] = y;
    }

    /**
     * Gets the magnitude of the vector.
     *
     * @public
     * @returns {number}
     */
    public magnitude(): number {
        return Math.sqrt(this[0] ** 2 + this[1] ** 2);
    }

    /**
     * Normalizes the vector.
     *
     * @public
     * @returns {this}
     */
    public normalize(): this {
        const mag = this.magnitude();
        if (mag > 0) {
            this[0] /= mag;
            this[1] /= mag;
        }
        return this;
    }

    /**
     * Adds another vector to this vector.
     *
     * @public
     * @param {Vector2} other
     * @returns {this}
     */
    public add(other: Vector2): this {
        this[0] += other[0];
        this[1] += other[1];
        return this;
    }

    /**
     * Subtracts another vector from this vector.
     *
     * @public
     * @param {Vector2} other
     * @returns {this}
     */
    public subtract(other: Vector2): this {
        this[0] -= other[0];
        this[1] -= other[1];
        return this;
    }

    /**
     * Scales this vector by a scalar value.
     *
     * @public
     * @param {number} scalar
     * @returns {this}
     */
    public scale(scalar: number): this {
        this[0] *= scalar;
        this[1] *= scalar;
        return this;
    }

    /**
     * Calculates the dot product of this vector and another vector.
     *
     * @public
     * @param {Vector2} other
     * @returns {number}
     */
    public dot(other: Vector2): number {
        return this[0] * other[0] + this[1] * other[1];
    }

    /**
     * Divides this vector by a scalar value.
     *
     * @public
     * @param {number} scalar
     * @returns {this}
     */
    public divide(scalar: number): this {
        if (scalar !== 0) {
            this[0] /= scalar;
            this[1] /= scalar;
        } else {
            throw new Error('Cannot divide by zero');
        }
        return this;
    }
}

(Vector2.prototype as any).set = function (this: Vector2, x: number, y?: number): void {
    this[0] = x;
    this[1] = y ?? this[1];
};
