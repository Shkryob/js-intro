import ValidationException from "./ValidationException";

export default class NotFunctionException extends ValidationException {
    constructor(funcName) {
        super('{funcName} does not exist or not a function');

        this.functName = funcName;
    }

    getMessageArgs() {
        return {
            funcName: this.functName,
        };
    }
}