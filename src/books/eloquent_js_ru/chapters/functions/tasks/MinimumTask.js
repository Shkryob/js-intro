import BaseTask from '../../../../BaseTask';
import description from './minimum_task.md';

export default class MinimumTask extends BaseTask {
    constructor() {
        super('Минимум', 'minimum', description, `// Your code here.

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, ['min']));

        this.expectFunction('min');

        this.expectFunctionOutput('min', [0, 10], 0);
        this.expectFunctionOutput('min', [0, -10], -10);
    }
}