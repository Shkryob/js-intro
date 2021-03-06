import BaseTask from '../../../../BaseTask';
import description from './vector_type_task.md';

export default class VectorTypeTask extends BaseTask {
    constructor() {
        super('Векторный тип', 'vector-type', description, `// Ваш код

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}