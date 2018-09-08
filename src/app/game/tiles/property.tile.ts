import { Game } from '../game';
import { Groups } from '../groups';
import { Player } from '../player';
import { colors } from './colors';
import { AbstractTile } from './tile';


export class PropertyTile extends AbstractTile {
  mortgaged = false;
  buildings = 0;
  owner: number;

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

  get color() {
    return colors[this.group] || '#000000';
  }

  onEnter(game: Game, player: Player) {
    return;
  }

  rentPrice(tiles: AbstractTile[], currentPlayer: Player) {
    if (this.buildings === 0) {
      const tileGroupSearch = tile =>
        tile instanceof PropertyTile && tile.group === this.group;
      const groupedTiles = tiles.filter(tileGroupSearch);
      const ownedTiles = groupedTiles.filter(
        (tile: PropertyTile) => tile.owner === currentPlayer.id
      );
      if (groupedTiles.length === ownedTiles.length) {
        return this.rent[0] * 2;
      }
    }
    return this.rent[Math.min(this.rent.length - 1, this.buildings)];
  }
}
