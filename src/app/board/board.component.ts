import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Game } from '../game/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  game = new Game();
  tiles = {
    top: [],
    right: [],
    bottom: [],
    left: []
  };

  constructor(private cd: ChangeDetectorRef) {
    const tiles = this.game.tiles.slice(0);
    this.tiles.top = tiles.slice(0, 11);
    this.tiles.right = tiles.slice(11, 20);
    this.tiles.bottom = tiles.slice(20, 31).reverse();
    this.tiles.left = tiles.slice(31).reverse();
    this.game.action.subscribe(() => {
      this.cd.detectChanges();
    });
  }

  ngOnInit() {
  }

}
