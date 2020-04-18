import BaseTask from '../../../../BaseTask';
import description from './diapason_sum_task.md';

export default class DiapasonSumTask extends BaseTask {
    constructor() {
        super('Сумма диапазона', 'diapason-sum', description, `console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}