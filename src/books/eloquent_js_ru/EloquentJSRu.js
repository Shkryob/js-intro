import BaseBook from "../BaseBook";
import ProgramStructureChapter from "./chapters/program_structure/ProgramStructureChapter";
import FunctionsChapter from "./chapters/functions/FunctionsChapter";

export default class EloquentJSRu extends BaseBook {
    constructor() {
        super('Выразительный JavaScript', 'eloquent_js_ru', 'ru', [
            new ProgramStructureChapter,
            new FunctionsChapter,
        ]);
    }
}