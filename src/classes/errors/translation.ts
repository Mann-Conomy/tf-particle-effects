/**
 * Custom error class for translation errors.
 * @extends Error
 */
export default class TranslationError extends Error {
    /**
     * Creates a new instance of TranslationError.
     * @param message The error message.
     */
    constructor(message: string) {
        super(message);

        this.name = "TranslationError";
    }
}
