import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StateAction } from '../game/actions/state.action';
import { Game, GameStates } from '../game/game';
import { GameController } from '../game/game-controller';

export interface UIState {
  canRoll?: boolean;
  needPurchase?: boolean;
  canMortgage?: boolean;
  canEnd?: boolean;
  canBuyOut?: boolean;
  canTrade?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  uiState = new BehaviorSubject<UIState>({ canRoll: true });
  gameController: GameController;

  constructor() {
    this.gameController = new GameController();
    this.gameController.game.action
      .pipe(
        filter(action => action instanceof StateAction),
        map(action => action.payload)
      )
      .subscribe(state => {
        console.log('STATE CHANGE', state);
        switch (state) {
          case GameStates.initial:
            this.uiState.next({
              canRoll: true
            });
            break;
          case GameStates.prison:
            this.uiState.next({ canRoll: true, canBuyOut: true });
            break;
          case GameStates.purchaseProperty:
            this.uiState.next({
              needPurchase: true,
              canTrade: true,
              canMortgage: true
            });
            break;
          case GameStates.extraDecisions:
            this.uiState.next({
              canTrade: true,
              canMortgage: true,
              canEnd: true
            });
            break;
        }
      });
  }
}
