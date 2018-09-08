import { TileEvent } from '../event';
import { Game } from '../game';
import { Player } from '../player';
import { AbstractTile } from './tile';

export class EventTile extends AbstractTile {
  events: TileEvent[];

  onEnter(game: Game, player: Player) {
    return;
  }
}
