import { Game } from '../game';
import { Player } from '../player';

let uid = 0;

export abstract class AbstractTile {

  uid = uid++;

  constructor(public name: string) {
  }

  abstract onEnter(game: Game, player: Player): any;
}

