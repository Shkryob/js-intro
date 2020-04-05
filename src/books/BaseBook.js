export default class BaseBook {
    constructor(name, slug, lang, chapters) {
        this.name = name;
        this.slug = slug;
        this.lang = lang;
        this.chapters = chapters;
    }

    getName() {
        return this.name;
    }

    getSlug() {
        return this.slug;
    }

    getLang() {
        return this.lang;
    }

    getChapters() {
        return this.chapters;
    }
}