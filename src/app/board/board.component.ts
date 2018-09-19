import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Game } from '../game/game';
import { GameController } from '../game/game-controller';
import { BoardService, UIState } from './board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  tiles = {
    top: [],
    right: [],
    bottom: [],
    left: []
  };
  game: Game;
  gameController: GameController;
  actions: UIState;

  constructor(private cd: ChangeDetectorRef, private board: BoardService) {
    this.gameController = this.board.gameController;
    this.game = this.gameController.game;
  }

  ngOnInit() {
    const tiles = this.game.tiles.slice(0);
    console.log(tiles);
    this.tiles.top = tiles.slice(0, 11);
    this.tiles.right = tiles.slice(11, 20);
    this.tiles.bottom = tiles.slice(20, 31).reverse();
    this.tiles.left = tiles.slice(31).reverse();
    this.game.action.subscribe((act) => {
      console.log(act);
      this.cd.detectChanges();
    });
    this.board.uiState.subscribe((state) => {
      this.actions = state;
      console.error(state);
      this.cd.detectChanges();
    });
    this.cd.detectChanges();
  }

  buy() {
    this.gameController.buyProperty();
  }
  pass() {
    this.gameController.skipBuy();
  }
  endTurn() {
    this.gameController.endTurn();
  }
  buyOut() {
    this.gameController.buyOut();
  }
}
