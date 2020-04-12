class BaseChapter {
    constructor(name, slug, theory, tasks) {
        this.name = name;
        this.slug = slug;
        this.theory = theory;
        this.tasks = tasks;
    }

    getName() {
        return this.name;
    }

    getSlug() {
        return this.slug;
    }

    getTheory() {
        return this.theory;
    }

    getTasks() {
        return this.tasks;
    }
}

export default BaseChapter;