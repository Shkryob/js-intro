export default class ValidationException extends Error {
    constructor(message) {
        super();
        this.message = message;
    }

    getMessage() {
        return this.message;
    }

    getMessageArgs() {
        return {};
    }
}