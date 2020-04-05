import BaseTask from "../../../../BaseTask";
import description from "./triangle_task.md";
import chai from 'chai';

export default class TriangleTask extends BaseTask {
    constructor() {
        super('Треугольник в цикле', description, `//Write your code here`);
    }

    validate(output) {
        chai.expect(output).equal(`#
##
###
####
#####
######
#######
`);
    }
}