import { Subject } from 'rxjs';
import { Action } from './actions/action';
import { StateAction } from './actions/state.action';
import { Player } from './player';
import { PrisonTile } from './tiles/prison.tile';
import { AbstractTile } from './tiles/tile';

export enum GameStates {
  initial = 'Initial state',
  rollDice = 'Roll Dice',
  purchaseProperty = 'Purchase Property',
  extraDecisions = 'Extra Decisions',
  prison = 'Prison State',
}

export class Game {
  get gameState(): GameStates {
    return this._gameState;
  }

  set gameState(value: GameStates) {
    this._gameState = value;
    this.action.next(new StateAction(value));
  }
  // tiles: AbstractTile[] = defaultTiles;
  players = [
    new Player('Player 1', '#e91636'),
    new Player('Player 2', '#8fc028')
  ];
  action = new Subject<Action>();

  private _gameState = GameStates.initial;

  roundMoney = 200;

  log = ['Start of game'];

  activePlayer: Player;

  private playerTurnQueue = [];

  constructor(public tiles: AbstractTile[]) {
    this.playerTurnQueue = this.players.map(player => player.id);
    this.nextPlayerTurn();
  }

  writeLog(player: Player, message) {
    this.log.push(`Player "${player.name}" ${message}`);
  }

  changeGameState(newState: GameStates) {
    this.gameState = newState;
  }

  updatePlayerMoney(player: Player, sum) {
    player.money += sum;
    // TODO: Process Bankrupt
  }

  nextPlayerTurn() {
    const nextPlayer = this.playerTurnQueue.shift();
    this.playerTurnQueue.push(nextPlayer);
    this.activePlayer = this.players.find(player => player.id === nextPlayer);
  }

  getPlayerTile(player: Player): AbstractTile {
    return this.tiles[player.position];
  }

  getPlayerById(id) {
    return this.players.find(p => p.id === id);
  }

  public endTurn() {
    if (this.gameState === GameStates.initial) {
      return;
    }
    this.nextPlayerTurn();
    const currentTile = this.getPlayerTile(this.activePlayer);
    this.gameState = GameStates.initial;
  }
}
