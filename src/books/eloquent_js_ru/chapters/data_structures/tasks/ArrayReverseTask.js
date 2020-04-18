import BaseTask from '../../../../BaseTask';
import description from './array_reverse_task.md';

export default class ArrayReverseTask extends BaseTask {
    constructor() {
        super('Обращаем вспять массив', 'array-reverse', description, `console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}