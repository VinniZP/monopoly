import { Game, GameStates } from '../game';
import { Player } from '../player';
import { AbstractTile } from './tile';

export class TaxTile extends AbstractTile {
  constructor(name: string, public amount: number) {
    super(name);
  }

  onEnter(game: Game, player: Player) {
    game.updatePlayerMoney(player, -this.amount);
    game.writeLog(player, `tax ${this.amount}`);
    game.changeGameState(GameStates.extraDecisions);
  }
}
