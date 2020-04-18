import ValidationException from "./ValidationException";

export default class IncorrectOutputException extends ValidationException {
    constructor(expected, actual) {
        super('Incorrect console output');

        this.showDiff = true;
        this.expected = expected;
        this.actual = actual;
    }

    getMessageArgs() {
        return {};
    }
}