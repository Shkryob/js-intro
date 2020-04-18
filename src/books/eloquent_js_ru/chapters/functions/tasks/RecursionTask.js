import BaseTask from '../../../../BaseTask';
import description from './recursion_task.md';

export default class RecursionTask extends BaseTask {
    constructor() {
        super('Рекурсия', 'recursion', description, `// Your code here.

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, ['isEven']));

        this.expectFunction('isEven');

        this.expectFunctionOutput('isEven', [50], true);
        this.expectFunctionOutput('isEven', [75], false);
        this.expectFunctionOutput('isEven', [-1], false);
    }
}