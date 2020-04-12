import theory from './program_structure.md';
import BaseChapter from "../../../BaseChapter";
import TriangleTask from "./tasks/TriangleTask";
import FizzBuzzTask from "./tasks/FizzBuzzTask";
import ChessDeskTask from "./tasks/ChessDeskTask";

class ProgramStructureChapter extends BaseChapter {
    constructor() {
        super('Структура Программы', 'program-structure', theory, [
            new TriangleTask(),
            new FizzBuzzTask(),
            new ChessDeskTask(),
        ]);
    }
}

export default ProgramStructureChapter;