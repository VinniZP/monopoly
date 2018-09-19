import { ComponentFactoryResolver, ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { PropertyTile } from '../../game/tiles/property.tile';
import { AbstractTile } from '../../game/tiles/tile';
import { PropertyTileComponent } from '../tiles/property-tile/property-tile.component';
import { TileComponent } from '../tiles/tile/tile.component';

@Directive({
  selector: '[appDynamicTile]'
})
export class DynamicTileDirective {
  private componentRef: ComponentRef<TileComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  private _extra = {};

  get extra(): {} {
    return this._extra;
  }

  @Input() set extra(value: {}) {
    this._extra = value;
    if (this.componentRef) {

      Object.keys(this.extra).forEach((key) => {
        this.componentRef.instance[key] = this.extra[key];
      });
    }
  }

  @Input()
  set appDynamicTile(tile: AbstractTile) {
    // TODO: Refactor
    let component: any = TileComponent;
    if (tile instanceof PropertyTile) {
      component = PropertyTileComponent;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<TileComponent>(
      component
    );

    this.viewContainerRef.clear();

    this.componentRef = this.viewContainerRef.createComponent<TileComponent>(
      componentFactory
    );
    this.componentRef.instance.tile = tile;
    Object.keys(this.extra).forEach((key) => {
      this.componentRef.instance[key] = this.extra[key];
    });
  }
}
