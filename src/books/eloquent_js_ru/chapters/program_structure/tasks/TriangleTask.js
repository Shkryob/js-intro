import BaseTask from '../../../../BaseTask';
import description from './triangle_task.md';

export default class TriangleTask extends BaseTask {
    constructor() {
        super('Треугольник в цикле', 'triangle', description);
    }

    validate(sandbox) {
        this.expectOutput(sandbox.getOutput(), `#
##
###
####
#####
######
#######
`);
    }
}