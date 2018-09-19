import { TileEvent } from '../event';
import { Game, GameStates } from '../game';
import { Player } from '../player';
import { AbstractTile } from './tile';

export class EventTile extends AbstractTile {
  private events: TileEvent[];

  constructor(name: string, events: TileEvent[]) {
    super(name);
    this.events = this.shuffle(events);
  }

  onEnter(game: Game, player: Player) {
    const event = this.events.shift();
    this.events.push(event);
    event.triggerAction(game);
    game.changeGameState(GameStates.extraDecisions);
  }

  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
