import BaseTask from '../../../../BaseTask';
import description from './minimum_task.md';
import chai from 'chai';

export default class MinimumTask extends BaseTask {
    constructor() {
        super('Минимум', 'minimum', description);
    }

    validate(sandbox) {
        const exposed = (sandbox.run(null, null, null, ['min']));

        chai.expect(exposed['min']).to.be.a('function');
        chai.expect(exposed['min'](0, 10)).equal(0);
        chai.expect(exposed['min'](0, -10)).equal(-10);
    }
}