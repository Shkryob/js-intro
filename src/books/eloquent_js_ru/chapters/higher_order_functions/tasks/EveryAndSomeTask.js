import BaseTask from '../../../../BaseTask';
import description from './every_and_some_task.md';

export default class EveryAndSomeTask extends BaseTask {
    constructor() {
        super('Every и some', 'every-and-some', description, `// Ваш код тут

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}