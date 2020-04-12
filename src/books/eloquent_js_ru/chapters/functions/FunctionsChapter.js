import theory from './functions.md';
import BaseChapter from "../../../BaseChapter";
import MinimumTask from "./tasks/MinimumTask";
import RecursionTask from "./tasks/RecursionTask";
import CountBeansTask from "./tasks/CountBeansTask";

class FunctionsChapter extends BaseChapter {
    constructor() {
        super('Функции', 'functions', theory, [
            new MinimumTask(),
            new RecursionTask(),
            new CountBeansTask(),
        ]);
    }
}

export default FunctionsChapter;