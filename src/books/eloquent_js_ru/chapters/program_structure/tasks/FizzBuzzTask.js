import BaseTask from "../../../../BaseTask";
import description from "./fizz_buzz_task.md";

export default class FizzBuzzTask extends BaseTask {
    constructor() {
        super('FizzBuzz', 'fizz-buzz', description);
    }
}