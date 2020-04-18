import BaseTask from '../../../../BaseTask';
import description from './deep_comparison_task.md';

export default class DeepComparisonTask extends BaseTask {
    constructor() {
        super('Глубокое сравнение', 'deep-comparison', description, `var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}