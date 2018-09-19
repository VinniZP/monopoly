import { TileEvent } from '../event';

export const bankEvents: TileEvent[] = [
  new TileEvent('Банковская ошибка в вашу пользу, получите 200$', function(game) {
    const player = game.activePlayer;
    game.updatePlayerMoney(player, 200);
    console.log(this);
  }),
  new TileEvent('Оплата страховки, заплатите 50$', function(game) {
    const player = game.activePlayer;
    game.updatePlayerMoney(player, -50);
    game.writeLog(player, this.text);
  })
];
