/**
 * Converts a given angle in degrees to radians.
 *
 * @export
 * @param {number} degrees The angle in degrees to convert.
 * @returns {number} The converted angle in radians.
 */
export function toRadian(degrees: number): number {
    return degrees * (Math.PI / 180);
}
