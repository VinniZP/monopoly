import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { Player } from '../../../game/player';
import { PropertyTile } from '../../../game/tiles/property.tile';
import { BoardService } from '../../board.service';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-product-tile',
  templateUrl: './property-tile.component.html',
  styleUrls: ['../tile.style.scss', './property-tile.component.css']
})
export class PropertyTileComponent extends TileComponent implements OnInit {
  @Input() tile: PropertyTile;
  @HostBinding('style.background-color') color;
  private owner: Player;

  constructor(elem: ElementRef, public board: BoardService) {
    super(elem);
  }

  ngOnInit() {
    super.ngOnInit();
    this.tile.ownerChange.pipe(this.destroy()).subscribe(() => {
      this.owner = this.board.gameController.game.getPlayerById(
        this.tile.owner
      );
      if (this.owner) {
        this.color = this.hexToRgbA(this.owner.color, '.4');
      } else {
        this.color = null;
      }
    });
  }

  hexToRgbA(hex, a = '1') {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        'rgba(' +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
        ',' +
        a +
        ')'
      );
    }
    throw new Error('Bad Hex');
  }
}
