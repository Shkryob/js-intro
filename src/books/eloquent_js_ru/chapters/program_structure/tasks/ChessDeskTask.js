import BaseTask from '../../../../BaseTask';
import description from './chess_desk_task.md';
import chai from 'chai';

export default class ChessDeskTask extends BaseTask {
    constructor() {
        super('Шахматная доска', 'chess-desk', description);
    }

    validate(output) {
        chai.expect(this.normalizeText(output)).equal(this.normalizeText(` # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # `));
    }
}