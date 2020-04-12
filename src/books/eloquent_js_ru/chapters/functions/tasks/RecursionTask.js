import BaseTask from '../../../../BaseTask';
import description from './recursion_task.md';
import chai from 'chai';

export default class RecursionTask extends BaseTask {
    constructor() {
        super('Рекурсия', 'recursion', description);
    }

    validate(sandbox) {
        chai.expect(this.normalizeText(sandbox.getOutput())).equal(this.normalizeText(`true
false
false`));
    }
}