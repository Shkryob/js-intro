import BaseTask from '../../../../BaseTask';
import description from './fizz_buzz_task.md';
import expectedOutput from './fizz_buzz_output.txt';

export default class FizzBuzzTask extends BaseTask {
    constructor() {
        super('FizzBuzz', 'fizz-buzz', description);
    }

    validate(sandbox) {
        this.expectOutput(sandbox.getOutput(), expectedOutput);
    }
}