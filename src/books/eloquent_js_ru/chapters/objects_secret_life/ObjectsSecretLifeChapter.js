import theory from './objects_secret_life.md';
import BaseChapter from "../../../BaseChapter";
import VectorTypeTask from "./tasks/VectorTypeTask";
import OneMoreCellTask from "./tasks/OneMoreCellTask";
import SequenceInterfaceTask from "./tasks/SequenceInterfaceTask";

export default class ObjectsSecretLifeChapter extends BaseChapter {
    constructor() {
        super('Тайная жизнь объектов', 'objects-secret-life', theory, [
            new VectorTypeTask(),
            new OneMoreCellTask(),
            new SequenceInterfaceTask(),
        ]);
    }
}
