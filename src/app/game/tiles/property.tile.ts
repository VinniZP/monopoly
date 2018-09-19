import { Subject } from 'rxjs';
import { Game, GameStates } from '../game';
import { Groups } from '../groups';
import { Player } from '../player';
import { colors } from './colors';
import { AbstractTile } from './tile';

export class PropertyTile extends AbstractTile {
  mortgaged = false;
  buildings = 0;

  constructor(
    name: string,
    public group: Groups,
    public price: number,
    public rent: number[],
    public houseCost: number,
    public hotelCost: number,
    public mortgageValue: number
  ) {
    super(name);
  }

  private _owner: number;

  get owner(): number {
    return this._owner;
  }

  set owner(value: number) {
    this._owner = value;
    this._ownerChange.next(value);
  }

  private _ownerChange = new Subject();

  public get ownerChange() {
    return this._ownerChange.asObservable();
  }

  get color() {
    return colors[this.group] || '#000000';
  }

  onEnter(game: Game, player: Player) {
    game.writeLog(player, `entered to ${this.name} property`);
    if (game.gameState === GameStates.rollDice) {
      if (this._owner) {
        if (this._owner !== player.id) {
          const rent = this.rentPrice(game.tiles, player);
          const owner = game.getPlayerById(this._owner);
          game.updatePlayerMoney(player, -rent);
          game.updatePlayerMoney(owner, rent);
          game.writeLog(
            player,
            `landed at ${owner.name}'s property and pay $${rent}`
          );
          game.writeLog(owner, `get rent ($${rent}) from ${player.name}`);
        }
        game.changeGameState(GameStates.extraDecisions);
      } else {
        game.changeGameState(GameStates.purchaseProperty);
      }
    }
  }

  rentPrice(tiles: AbstractTile[], currentPlayer: Player) {
    if (this.buildings === 0) {
      const tileGroupSearch = tile =>
        tile instanceof PropertyTile && tile.group === this.group;
      const groupedTiles = tiles.filter(tileGroupSearch);
      const ownedTiles = groupedTiles.filter(
        (tile: PropertyTile) => tile._owner === currentPlayer.id
      );
      console.log(groupedTiles, ownedTiles, this.rent);
      if (groupedTiles.length === ownedTiles.length) {
        return this.rent[0] * 2;
      }
      return this.rent[0];
    }
    return this.rent[Math.min(this.rent.length - 1, this.buildings)];
  }
}
