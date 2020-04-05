export default class BaseTask {
    constructor(title, description, startCode) {
        this.title = title;
        this.description = description;
        this.startCode = startCode;
    }

    getTitle() {
        return this.title;
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
}