import BaseTask from '../../../../BaseTask';
import description from './fizz_buzz_task.md';
import chai from 'chai';
import expectedOutput from './fizz_buzz_output.txt';

export default class FizzBuzzTask extends BaseTask {
    constructor() {
        super('FizzBuzz', 'fizz-buzz', description);
    }

    validate(output) {
        chai.expect(this.normalizeText(output)).equal(this.normalizeText(expectedOutput));
    }
}