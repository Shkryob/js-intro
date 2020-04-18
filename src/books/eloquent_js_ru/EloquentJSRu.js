import BaseBook from "../BaseBook";
import ProgramStructureChapter from "./chapters/program_structure/ProgramStructureChapter";
import FunctionsChapter from "./chapters/functions/FunctionsChapter";
import DataStructures from "./chapters/data_structures/DataStructures";
import HigherOrderFunctionsChapter from "./chapters/higher_order_functions/HigherOrderFunctionsChapter";
import ObjectsSecretLifeChapter from "./chapters/objects_secret_life/ObjectsSecretLifeChapter";
import ElectronicLifeChapter from "./chapters/electronic_life/ElectronicLifeChapter";

export default class EloquentJSRu extends BaseBook {
    constructor() {
        super('Выразительный JavaScript', 'eloquent-js-ru', 'ru', [
            new ProgramStructureChapter,
            new FunctionsChapter,
            new DataStructures,
            new HigherOrderFunctionsChapter,
            new ObjectsSecretLifeChapter,
            new ElectronicLifeChapter,
        ]);
    }
}