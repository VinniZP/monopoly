import { Game } from '../game';
import { Player } from '../player';
import { AbstractTile } from './tile';

export class StartTile extends AbstractTile {
  onEnter(game: Game, player: Player) {
    return;
  }
}