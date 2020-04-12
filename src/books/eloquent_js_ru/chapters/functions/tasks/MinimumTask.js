import BaseTask from '../../../../BaseTask';
import description from './minimum_task.md';
import chai from 'chai';

export default class MinimumTask extends BaseTask {
    constructor() {
        super('Минимум', 'minimum', description);
    }

    validate(output) {
        chai.expect(this.normalizeText(output)).equal(this.normalizeText(`0
-10`));
    }
}