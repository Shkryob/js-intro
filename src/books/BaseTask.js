import NotFunctionException from "../exceptions/NotFunctionException";
import IncorrectFunctionOutputException from "../exceptions/IncorrectFunctionOutputException";
import IncorrectOutputException from "../exceptions/IncorrectOutputException";

export default class BaseTask {
    constructor(title, slug, description, startCode) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.startCode = startCode ?? `//Write your code here`;
        this.exposed = [];
    }

    getTitle() {
        return this.title;
    }

    getSlug() {
        return this.slug;
    }

    getDescription() {
        return this.description;
    }

    getStartCode() {
        return this.startCode;
    }

    validate(output) {
        return !!output;
    }

    normalizeText(text) {
        return text.replace(/\r?\n|\r/g, '\n')
            .replace('\\n', '\n')
            .replace(/(\n)+$/g, '');
    }

    expectFunction(funcName) {
        if (typeof this.exposed !== 'object' || typeof this.exposed[funcName] !== 'function') {
            throw new NotFunctionException(funcName);
        }
    }

    expectFunctionOutput(funcName, args, expected) {
        const result = this.exposed[funcName](...args);
        if (result !== expected) {
            throw new IncorrectFunctionOutputException(funcName, args, expected, result);
        }
    }

    expectOutput(output, expected) {
        if (this.normalizeText(output) !== this.normalizeText(expected)) {
            throw new IncorrectOutputException(output, expected);
        }
    }
}