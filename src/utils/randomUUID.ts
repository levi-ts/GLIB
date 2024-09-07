/**
 * Generates a random UUID (version 4).
 *
 * The generated UUID is a string of 32 hexadecimal digits, displayed in 5 groups separated by hyphens, in the form 8-4-4-4-12.
 * The first group is 8 hexadecimal digits, the second group is 4 hexadecimal digits, the third group is 4 hexadecimal digits, the fourth group is 4 hexadecimal digits, and the fifth group is 12 hexadecimal digits.
 * The generated UUID is a random UUID (version 4).
 *
 * @export
 * @returns {string} A random UUID (version 4).
 */
export function randomUUID() {
    let timestamp = new Date().getTime();
    let microseconds = typeof performance !== 'undefined' && performance.now ? performance.now() * 1000 : 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        let randomValue = Math.random() * 16;

        if (timestamp > 0) {
            randomValue = (timestamp + randomValue) % 16 | 0;
            timestamp = Math.floor(timestamp / 16);
        } else {
            randomValue = (microseconds + randomValue) % 16 | 0;
            microseconds = Math.floor(microseconds / 16);
        }

        return (char === 'x' ? randomValue : (randomValue & 0x3) | 0x8).toString(16);
    });
}
