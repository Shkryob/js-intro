import BaseTask from '../../../../BaseTask';
import description from './age_diff_task.md';

export default class AgeDiffTask extends BaseTask {
    constructor() {
        super('Разница в возрасте матерей и их детей', 'age-diff', description, `function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Ваш код тут

// → 31.2`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}