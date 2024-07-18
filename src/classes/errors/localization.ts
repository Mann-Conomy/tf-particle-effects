/**
 * Custom error class for localization errors.
 * @extends Error
 */
export default class LocalizationError extends Error {
    /**
     * Creates a new instance of LocalizationError.
     * @param message The error message.
     */
    constructor(message: string) {
        super(message);

        this.name = "LocalizationError";
    }
}
