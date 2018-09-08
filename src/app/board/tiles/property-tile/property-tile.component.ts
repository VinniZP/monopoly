import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PropertyTile } from '../../../game/tiles/property.tile';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-product-tile',
  templateUrl: './property-tile.component.html',
  styleUrls: ['../tile.style.scss', './property-tile.component.css']
})
export class PropertyTileComponent extends TileComponent implements OnInit {
  @Input() tile: PropertyTile;

  constructor(elem: ElementRef) {
    super(elem);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
