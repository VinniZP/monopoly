import { Game, GameStates } from '../game';
import { Player } from '../player';
import { AbstractTile } from './tile';

export class StartTile extends AbstractTile {
  onEnter(game: Game, player: Player) {
    game.changeGameState(GameStates.extraDecisions);
    return;
  }
}
