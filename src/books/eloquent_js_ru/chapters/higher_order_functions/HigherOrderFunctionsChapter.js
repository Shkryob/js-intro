import theory from './higher_order_functions.md';
import BaseChapter from "../../../BaseChapter";
import FlatternTask from "./tasks/FlatternTask";
import AgeDiffTask from "./tasks/AgeDiffTask";
import LifetimeExpectationTask from "./tasks/LifetimeExpectationTask";
import EveryAndSomeTask from "./tasks/EveryAndSomeTask";

export default class HigherOrderFunctionsChapter extends BaseChapter {
    constructor() {
        super('Функции высшего порядка', 'higher-order-functions', theory, [
            new FlatternTask(),
            new AgeDiffTask(),
            new LifetimeExpectationTask(),
            new EveryAndSomeTask(),
        ]);
    }
}
