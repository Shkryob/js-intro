import theory from './electronic_life.md';
import BaseChapter from "../../../BaseChapter";
import ArtificialIdiotTask from "./tasks/ArtificialIdiotTask";
import PredatorsTask from "./tasks/PredatorsTask";

export default class ElectronicLifeChapter extends BaseChapter {
    constructor() {
        super('Проект: электронная жизнь', 'electronic-life', theory, [
            new ArtificialIdiotTask(),
            new PredatorsTask(),
        ]);
    }
}
