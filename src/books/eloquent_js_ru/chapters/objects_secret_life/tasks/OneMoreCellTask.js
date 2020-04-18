import BaseTask from '../../../../BaseTask';
import description from './one_more_cell_task.md';

export default class OneMoreCellTask extends BaseTask {
    constructor() {
        super('Ещё одна ячейка', 'one-more-cell', description, `// Ваш код.

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}