import BaseTask from '../../../../BaseTask';
import description from './count_beans_task.md';
import chai from 'chai';

export default class CountBeansTask extends BaseTask {
    constructor() {
        super('Считаем бобы', 'count-beans', description);
    }

    validate(sandbox) {
        const exposed = (sandbox.run(null, null, null, ['countBs', ['countChar']]));

        chai.expect(exposed['countBs']).to.be.a('function');
        chai.expect(exposed['countChar']).to.be.a('function');

        chai.expect(exposed['countBs']('BBC')).equal(2);
        chai.expect(exposed['countChar']('kakkerlak', 'k')).equal(4);
    }
}