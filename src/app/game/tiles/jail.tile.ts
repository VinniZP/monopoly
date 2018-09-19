import { Game } from '../game';
import { Player } from '../player';
import { PrisonTile } from './prison.tile';
import { AbstractTile } from './tile';

export class JailTile extends AbstractTile {
  onEnter(game: Game, player: Player) {
    player.position = game.tiles.findIndex(tile => tile instanceof PrisonTile);
    player.jailed = true;
    game.endTurn();
    game.writeLog(player, `you are jailed`);
  }
}
