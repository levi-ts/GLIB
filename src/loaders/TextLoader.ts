/**
 * The TextLoader class is a utility class for loading text files from a given URL.
 *
 * @export
 * @class TextLoader
 * @typedef {TextLoader}
 */
export class TextLoader {
    /**
     * Loads a text file from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<string>} A promise containing the contents of the file.
     */
    public async load(url: string): Promise<string> {
        const response = await fetch(url);
        const text = await response.text();

        return text;
    }
}
