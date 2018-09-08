import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractTile } from '../../../game/tiles/tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['../tile.style.scss', './tile.component.css'],
})
export class TileComponent implements OnInit {
  @Input() tile: AbstractTile;
  @HostBinding('class.tile') isTile = true;
  @HostBinding('attr.id') id;

  constructor(private elem: ElementRef<Element>) {
    console.log(this._position);
  }

  private _position;

  get position() {
    return this._position;
  }

  @Input() set position(value) {
    this._position = value;
    if (value && this.elem) {
      this.elem.nativeElement.classList.add(`pos-${value}`);
    }
  }

  ngOnInit() {
    if (this.position) {
      this.elem.nativeElement.classList.add(`pos-${this.position}`);
    }
    this.id = `tile-id-${this.tile.uid}`;
  }
}
