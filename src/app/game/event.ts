import { Game } from './game';

type actionFn = (game: Game) => void;

export class TileEvent {
  constructor(public text: string, public action: actionFn) {}

  triggerAction(game: Game) {
    this.action.call(this, game);
  }
}
