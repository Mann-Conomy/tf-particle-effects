/**
 * Custom error class for when a requested resource is not found.
 * @extends Error
 */
export default class NotFoundError extends Error {
    /**
     * Creates a new instance of NotFoundError.
     * @param message The error message.
     */
    constructor(message: string) {
        super(message);

        this.name = "NotFoundError";
    }
}
