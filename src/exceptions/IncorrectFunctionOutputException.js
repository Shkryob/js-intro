import ValidationException from "./ValidationException";

export default class IncorrectFunctionOutputException extends ValidationException {
    constructor(funcName, args, expected, actual) {
        super('Function call {funcName}({args}) returned {actual}, expected output {expected}');

        this.functName = funcName;
        this.args = args;
        this.expected = expected;
        this.actual = actual;
    }

    getMessageArgs() {
        return {
            funcName: this.functName,
            args: this.args.join(', '),
            expected: this.expected,
            actual: this.actual,
        };
    }
}