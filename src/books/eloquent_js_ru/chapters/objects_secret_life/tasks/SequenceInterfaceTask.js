import BaseTask from '../../../../BaseTask';
import description from './sequence_interface_task.md';

export default class SequenceInterfaceTask extends BaseTask {
    constructor() {
        super('Интерфейс к последовательностям', 'sequence-interface', description, `// Ваш код.

logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}