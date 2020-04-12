import BaseTask from '../../../../BaseTask';
import description from './recursion_task.md';
import chai from 'chai';

export default class RecursionTask extends BaseTask {
    constructor() {
        super('Рекурсия', 'recursion', description);
    }

    validate(sandbox) {
        const exposed = (sandbox.run(null, null, null, ['isEven']));

        chai.expect(exposed['isEven']).to.be.a('function');
        chai.expect(exposed['isEven'](50)).equal(true);
        chai.expect(exposed['isEven'](75)).equal(false);
        chai.expect(exposed['isEven'](-1)).equal(false);
    }
}