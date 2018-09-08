import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPlayerPosition]'
})
export class PlayerPositionDirective implements OnChanges {

  @Input() appPlayerPosition: number;
  @HostBinding('style.background-color') @Input() color: string;
  @HostBinding('style.top') @Input() top: string;
  @HostBinding('style.left') @Input() left: string;

  constructor(private elem: ElementRef<HTMLElement>) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.appPlayerPosition) {
      this.move();
    }
  }

  private move() {
    const pos = this.appPlayerPosition;
    const tile = document.getElementById(`tile-id-${pos}`);
    console.log(tile, `tile-id-${pos}`);
    this.top = tile.offsetTop + (tile.offsetHeight / 2) - (this.elem.nativeElement.offsetHeight / 2) + 'px';
    this.left = tile.offsetLeft + (tile.offsetWidth / 2) - (this.elem.nativeElement.offsetWidth / 2) + 'px';
  }
}
