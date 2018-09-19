import { Player } from '../player';
import { Action } from './action';

export class MovePlayerAction implements Action {
  type = 'move_player';

  constructor(public payload: {player: Player, newPos: number}) {
  }
}
