import BaseTask from "../../../../BaseTask";
import description from "./chess_desk_task.md";

export default class ChessDeskTask extends BaseTask {
    constructor() {
        super('Шахматная доска', 'chess-desk', description);
    }
}