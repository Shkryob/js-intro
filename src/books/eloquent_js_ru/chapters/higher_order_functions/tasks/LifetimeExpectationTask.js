import BaseTask from '../../../../BaseTask';
import description from './lifetime_expectation_task.md';

export default class LifetimeExpectationTask extends BaseTask {
    constructor() {
        super('Историческая ожидаемая продолжительность жизни', 'lifetime-expectation', description, `function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// Тут ваш код

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}