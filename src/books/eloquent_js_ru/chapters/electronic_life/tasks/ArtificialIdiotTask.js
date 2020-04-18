import BaseTask from '../../../../BaseTask';
import description from './artificial_idiot_task.md';

export default class ArtificialIdiotTask extends BaseTask {
    constructor() {
        super('Искусственный идиот', 'artificial-idiot', description, `// Ваш код
function SmartPlantEater() {}

animateWorld(new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": SmartPlantEater,
   "*": Plant}
));`);
    }

    validate(sandbox) {
        this.exposed = (sandbox.run(null, null, null, []));
    }
}