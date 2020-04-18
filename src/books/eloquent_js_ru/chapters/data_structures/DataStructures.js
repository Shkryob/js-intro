import theory from './data_strucutres.md';
import BaseChapter from "../../../BaseChapter";
import DiapasonSumTask from "./tasks/DiapasonSumTask";
import ArrayReverseTask from "./tasks/ArrayReverseTask";
import ListTask from "./tasks/ListTask";
import DeepComparisonTask from "./tasks/DeepComparisonTask";

export default class DataStructures extends BaseChapter {
    constructor() {
        super('Структуры данных', 'data-structures', theory, [
            new DiapasonSumTask(),
            new ArrayReverseTask(),
            new ListTask(),
            new DeepComparisonTask(),
        ]);
    }
}
