import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './board/tiles/tile/tile.component';
import { DynamicTileDirective } from './board/directives/dynamic-tile.directive';
import { PropertyTileComponent } from './board/tiles/property-tile/property-tile.component';
import { PlayerPositionDirective } from './player-position.directive';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent,
    DynamicTileDirective,
    PropertyTileComponent,
    PlayerPositionDirective
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PropertyTileComponent, TileComponent]
})
export class AppModule {}
