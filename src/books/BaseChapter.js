class BaseChapter {
    constructor(name, theory, tasks) {
        this.name = name;
        this.theory = theory;
        this.tasks = tasks;
    }

    getName() {
        return this.name;
    }

    getTheory() {
        return this.theory;
    }

    getTasks() {
        return this.tasks;
    }
}

export default BaseChapter;