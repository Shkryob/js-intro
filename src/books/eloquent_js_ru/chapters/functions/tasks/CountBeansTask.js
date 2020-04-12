import BaseTask from '../../../../BaseTask';
import description from './count_beans_task.md';
import chai from 'chai';

export default class CountBeansTask extends BaseTask {
    constructor() {
        super('Считаем бобы', 'count-beans', description);
    }

    validate(output) {
        chai.expect(this.normalizeText(output)).equal(this.normalizeText(`2
4`));
    }
}