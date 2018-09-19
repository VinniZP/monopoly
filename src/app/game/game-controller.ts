import { MovePlayerAction } from './actions/move-player.action';
import { defaultTiles } from './defaultTiles';
import { Dice } from './dice';
import { Game, GameStates } from './game';
import { Player } from './player';
import { PrisonTile } from './tiles/prison.tile';
import { PropertyTile } from './tiles/property.tile';

export class GameController {
  game: Game;

  constructor() {
    this.game = new Game(defaultTiles);
  }

  roll() {
    console.log(this.game.gameState);
    if (
      this.game.gameState !== GameStates.initial &&
      this.game.gameState !== GameStates.prison
    ) {
      return;
    }
    const currentTile = this.game.getPlayerTile(this.game.activePlayer);
    this.game.gameState = GameStates.rollDice;
    const dice = Dice.roll();
    const player = this.game.activePlayer;
    if (currentTile instanceof PrisonTile && player.jailed) {
      if (!dice.isDouble()) {
        this.game.endTurn();
        return;
      } else {
        player.jailed = false;
      }
    }
    this.game.writeLog(player, `rolled ${dice}`);
    this.movePlayer(player, dice);
    const tile = this.game.getPlayerTile(player);
    tile.onEnter(this.game, player);
    console.log('new', this.game.gameState);
    this.game.action.next(
      new MovePlayerAction({ player, newPos: player.position })
    );
  }

  buyOut() {
    if (this.game.gameState !== GameStates.prison) {
      return;
    }
    this.game.updatePlayerMoney(this.game.activePlayer, -500);
    this.game.writeLog(this.game.activePlayer, 'освободился из тюрьмы за $500');
    this.game.gameState = GameStates.initial;
  }

  endTurn() {
    this.game.endTurn();

    const player = this.game.activePlayer;
    if (this.game.getPlayerTile(player) instanceof PrisonTile && player.jailed) {
      this.game.changeGameState(GameStates.prison);
      return;
    }
  }

  public buyProperty() {
    if (this.game.gameState !== GameStates.purchaseProperty) {
      return;
    }
    const tile = this.game.getPlayerTile(this.game.activePlayer);
    if (tile instanceof PropertyTile) {
      tile.owner = this.game.activePlayer.id;
      this.game.updatePlayerMoney(this.game.activePlayer, -tile.price);
      this.game.writeLog(
        this.game.activePlayer,
        `bought ${tile.name} (${tile.price})`
      );
      this.game.changeGameState(GameStates.extraDecisions);
    }
  }

  public skipBuy() {
    this.game.changeGameState(GameStates.extraDecisions);
  }

  private movePlayer(player: Player, dice: Dice) {
    const currentPos = player.position;
    let neededPosition = currentPos + dice.stepsToGo();
    while (neededPosition >= this.game.tiles.length) {
      this.game.updatePlayerMoney(player, this.game.roundMoney);
      this.game.writeLog(player, `get $${this.game.roundMoney}`);
      neededPosition -= this.game.tiles.length;
    }
    player.position = neededPosition;
    const tile = this.game.getPlayerTile(player);
  }
}
