import BaseTask from '../../../../BaseTask';
import description from './count_beans_task.md';

export default class CountBeansTask extends BaseTask {
    constructor() {
        super('Считаем бобы', 'count-beans', description, `// Your code here.

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, ['countBs', 'countChar']));

        this.expectFunction('countBs');
        this.expectFunction('countChar');

        this.expectFunctionOutput('countBs', ['BBC'], 2);
        this.expectFunction('countChar', ['kakkerlak', 'k'], 4);
    }
}