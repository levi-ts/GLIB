import { EPSILON } from '../utils/constants';
import { Vector3 } from './Vector3';

/**
 * ${1:Description placeholder}
 *
 * @export
 * @class Matrix4
 * @typedef {Matrix4}
 * @extends {Float32Array}
 */
export class Matrix4 extends Float32Array {
    /**
     * Creates an instance of Matrix4.
     *
     * @constructor
     */
    constructor() {
        super(16);
        this.identity();
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {this}
     */
    public identity(): this {
        this.fill(0);
        this[0] = this[5] = this[10] = this[15] = 1;
        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Vector3} eye
     * @param {Vector3} center
     * @param {Vector3} up
     * @returns {this}
     */
    public lookAt(eye: Vector3, center: Vector3, up: Vector3): this {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        const [eyex, eyey, eyez] = eye;
        const [upx, upy, upz] = up;
        const [centerx, centery, centerz] = center;

        if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
            return this.identity();
        }

        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;
        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.hypot(x0, x1, x2);
        if (len === 0) {
            x0 = x1 = x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.hypot(y0, y1, y2);
        if (len === 0) {
            y0 = y1 = y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        this.set([x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0, -(x0 * eyex + x1 * eyey + x2 * eyez), -(y0 * eyex + y1 * eyey + y2 * eyez), -(z0 * eyex + z1 * eyey + z2 * eyez), 1]);

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @param {Vector3} axis
     * @returns {this}
     */
    public rotate(rad: number, axis: Vector3): this {
        let [x, y, z] = axis;
        let len = Math.hypot(x, y, z);
        if (len < EPSILON) return this;

        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;

        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const t = 1 - c;

        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a03 = this[3];
        const a10 = this[4],
            a11 = this[5],
            a12 = this[6],
            a13 = this[7];
        const a20 = this[8],
            a21 = this[9],
            a22 = this[10],
            a23 = this[11];

        const b00 = x * x * t + c,
            b01 = y * x * t + z * s,
            b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s,
            b11 = y * y * t + c,
            b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s,
            b21 = y * z * t - x * s,
            b22 = z * z * t + c;

        this.set([
            a00 * b00 + a10 * b01 + a20 * b02,
            a01 * b00 + a11 * b01 + a21 * b02,
            a02 * b00 + a12 * b01 + a22 * b02,
            a03 * b00 + a13 * b01 + a23 * b02,
            a00 * b10 + a10 * b11 + a20 * b12,
            a01 * b10 + a11 * b11 + a21 * b12,
            a02 * b10 + a12 * b11 + a22 * b12,
            a03 * b10 + a13 * b11 + a23 * b12,
            a00 * b20 + a10 * b21 + a20 * b22,
            a01 * b20 + a11 * b21 + a21 * b22,
            a02 * b20 + a12 * b21 + a22 * b22,
            a03 * b20 + a13 * b21 + a23 * b22,
            this[12],
            this[13],
            this[14],
            this[15],
        ]);

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Matrix4} other
     * @returns {this}
     */
    public multiply(other: Matrix4): this {
        const a = this;
        const b = other;
        const result = new Float32Array(16);

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = a[i * 4 + 0] * b[0 * 4 + j] + a[i * 4 + 1] * b[1 * 4 + j] + a[i * 4 + 2] * b[2 * 4 + j] + a[i * 4 + 3] * b[3 * 4 + j];
            }
        }

        this.set(result);
        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @returns {this}
     */
    public rotateX(rad: number): this {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        const a10 = this[4],
            a11 = this[5],
            a12 = this[6],
            a13 = this[7];
        const a20 = this[8],
            a21 = this[9],
            a22 = this[10],
            a23 = this[11];

        this[4] = a10 * c + a20 * s;
        this[5] = a11 * c + a21 * s;
        this[6] = a12 * c + a22 * s;
        this[7] = a13 * c + a23 * s;

        this[8] = a20 * c - a10 * s;
        this[9] = a21 * c - a11 * s;
        this[10] = a22 * c - a12 * s;
        this[11] = a23 * c - a13 * s;

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @returns {this}
     */
    public rotateY(rad: number): this {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a03 = this[3];
        const a20 = this[8],
            a21 = this[9],
            a22 = this[10],
            a23 = this[11];

        this[0] = a00 * c - a20 * s;
        this[1] = a01 * c - a21 * s;
        this[2] = a02 * c - a22 * s;
        this[3] = a03 * c - a23 * s;

        this[8] = a00 * s + a20 * c;
        this[9] = a01 * s + a21 * c;
        this[10] = a02 * s + a22 * c;
        this[11] = a03 * s + a23 * c;

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number} rad
     * @returns {this}
     */
    public rotateZ(rad: number): this {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a03 = this[3];
        const a10 = this[4],
            a11 = this[5],
            a12 = this[6],
            a13 = this[7];

        this[0] = a00 * c + a10 * s;
        this[1] = a01 * c + a11 * s;
        this[2] = a02 * c + a12 * s;
        this[3] = a03 * c + a13 * s;

        this[4] = a10 * c - a00 * s;
        this[5] = a11 * c - a01 * s;
        this[6] = a12 * c - a02 * s;
        this[7] = a13 * c - a03 * s;

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Vector3} v
     * @returns {this}
     */
    public scale(v: Vector3): this {
        const [x, y, z] = v;

        this[0] *= x;
        this[1] *= x;
        this[2] *= x;
        this[3] *= x;
        this[4] *= y;
        this[5] *= y;
        this[6] *= y;
        this[7] *= y;
        this[8] *= z;
        this[9] *= z;
        this[10] *= z;
        this[11] *= z;

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {Vector3} v
     * @returns {this}
     */
    public translate(v: Vector3): this {
        const [x, y, z] = v;

        this[12] = this[0] * x + this[4] * y + this[8] * z + this[12];
        this[13] = this[1] * x + this[5] * y + this[9] * z + this[13];
        this[14] = this[2] * x + this[6] * y + this[10] * z + this[14];
        this[15] = this[3] * x + this[7] * y + this[11] * z + this[15];

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {(this | null)}
     */
    public invert(): this | null {
        const m = this;
        const inv = new Float32Array(16);
        inv[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] + m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
        inv[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] - m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
        inv[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] + m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
        inv[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] - m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
        inv[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] - m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
        inv[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] + m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
        inv[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] - m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
        inv[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] + m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
        inv[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] + m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
        inv[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] - m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
        inv[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] + m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
        inv[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] - m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
        inv[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] - m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
        inv[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] + m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
        inv[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] - m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
        inv[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] + m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

        let det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];
        if (det === 0) return null;

        det = 1.0 / det;

        for (let i = 0; i < 16; i++) {
            this[i] = inv[i] * det;
        }

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {this}
     */
    public transpose(): this {
        const m = this;
        let temp;

        temp = m[1];
        m[1] = m[4];
        m[4] = temp;
        temp = m[2];
        m[2] = m[8];
        m[8] = temp;
        temp = m[6];
        m[6] = m[9];
        m[9] = temp;

        temp = m[3];
        m[3] = m[12];
        m[12] = temp;
        temp = m[7];
        m[7] = m[13];
        m[13] = temp;
        temp = m[11];
        m[11] = m[14];
        m[14] = temp;

        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {number}
     */
    public determinant(): number {
        const m = this;

        const m00 = m[0],
            m01 = m[1],
            m02 = m[2],
            m03 = m[3];
        const m10 = m[4],
            m11 = m[5],
            m12 = m[6],
            m13 = m[7];
        const m20 = m[8],
            m21 = m[9],
            m22 = m[10],
            m23 = m[11];
        const m30 = m[12],
            m31 = m[13],
            m32 = m[14],
            m33 = m[15];

        return (
            m00 * (m11 * (m22 * m33 - m23 * m32) - m12 * (m21 * m33 - m23 * m31) + m13 * (m21 * m32 - m22 * m31)) -
            m01 * (m10 * (m22 * m33 - m23 * m32) - m12 * (m20 * m33 - m23 * m30) + m13 * (m20 * m32 - m22 * m30)) +
            m02 * (m10 * (m21 * m33 - m23 * m31) - m11 * (m20 * m33 - m23 * m30) + m13 * (m20 * m31 - m21 * m30)) -
            m03 * (m10 * (m21 * m32 - m22 * m31) - m11 * (m20 * m32 - m22 * m30) + m12 * (m20 * m31 - m21 * m30))
        );
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {Matrix4}
     */
    public copy(): Matrix4 {
        const copy = new Matrix4();
        copy.set(this);
        return copy;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {string}
     */
    public toString(): string {
        return `
            [${this[0]}, ${this[4]}, ${this[8]}, ${this[12]}]
            [${this[1]}, ${this[5]}, ${this[9]}, ${this[13]}]
            [${this[2]}, ${this[6]}, ${this[10]}, ${this[14]}]
            [${this[3]}, ${this[7]}, ${this[11]}, ${this[15]}]
        `;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @param {number[]} array
     * @returns {this}
     */
    public fromArray(array: number[]): this {
        this.set(array);
        return this;
    }

    /**
     * ${1:Description placeholder}
     *
     * @public
     * @returns {number[]}
     */
    public toArray(): number[] {
        return Array.from(this);
    }
}
