export default class BaseTask {
    constructor(title, slug, description, startCode) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.startCode = startCode ?? `//Write your code here`;
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
}