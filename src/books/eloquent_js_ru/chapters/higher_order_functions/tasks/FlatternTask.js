import BaseTask from '../../../../BaseTask';
import description from './flattern_task.md';

export default class FlatternTask extends BaseTask {
    constructor() {
        super('Свёртка', 'flattern', description, `var arrays = [[1, 2, 3], [4, 5], [6]];
// Ваш код тут
// → [1, 2, 3, 4, 5, 6]`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}