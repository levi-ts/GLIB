/**
 * The JSONLoader class is a utility class for loading json files from a given URL.
 *
 * @export
 * @class JSONLoader
 * @typedef {JSONLoader}
 */
export class JSONLoader {
    /**
     * Loads a json file from a given URL.
     *
     * @public
     * @async
     * @param {string} url The URL of the file to be loaded.
     * @returns {Promise<string>} A promise containing the contents of the file.
     */
    public async load(url: string): Promise<string> {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    }
}
