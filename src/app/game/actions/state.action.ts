import { GameStates } from '../game';
import { Action } from './action';

export class StateAction implements Action {
  type = 'change_state';

  constructor(public payload: GameStates) {
  }
}
