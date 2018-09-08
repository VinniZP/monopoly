import { Subject } from 'rxjs';
import { MovePlayerAction } from './actions/move-player';
import { Groups } from './groups';
import { Player } from './player';
import { EventTile } from './tiles/event.tile';
import { JailTile } from './tiles/jail.tile';
import { ParkingTile } from './tiles/parking.tile';
import { PrisonTile } from './tiles/prison.tile';
import { PropertyTile } from './tiles/property.tile';
import { StartTile } from './tiles/start.tile';
import { TaxTile } from './tiles/tax.tile';
import { AbstractTile } from './tiles/tile';

const chanceTile = () => new EventTile('Шанс');
const bankTile = () => new EventTile('Казна');

const defaultTiles: AbstractTile[] = [
  new StartTile('Start'),
  new PropertyTile('Старая дорога', Groups.road, 60, [], 0, 0, 0),
  new PropertyTile('Главная дорога', Groups.road, 60, [], 0, 0, 0),
  bankTile(),
  new TaxTile('Налог с дохода'),
  new PropertyTile('Западный порт', Groups.transport, 200, [], 0, 0, 0),
  new PropertyTile('Аквапарк', Groups.entertainment, 100, [], 0, 0, 0),
  chanceTile(),
  new PropertyTile('Городской парк', Groups.entertainment, 100, [], 0, 0, 0),
  new PropertyTile(
    'Горнолыжный курорт',
    Groups.entertainment,
    120,
    [],
    0,
    0,
    0
  ),
  new PrisonTile('Тюрьма'),
  new PropertyTile('Спальный район', Groups.district, 120, [], 0, 0, 0),
  new PropertyTile(
    'Электрическая компания',
    Groups.infrastructure,
    120,
    [],
    0,
    0,
    0
  ),
  new PropertyTile('Деловой квартал', Groups.district, 120, [], 0, 0, 0),
  new PropertyTile('Торговая площадь', Groups.district, 120, [], 0, 0, 0),
  new PropertyTile('Северный порт', Groups.transport, 200, [], 0, 0, 0),
  new PropertyTile('Спальный район', Groups.street, 120, [], 0, 0, 0),
  bankTile(),
  new PropertyTile('Деловой квартал', Groups.street, 120, [], 0, 0, 0),
  new PropertyTile('Торговая площадь', Groups.street, 120, [], 0, 0, 0),
  new ParkingTile('Бесплатная парковка'),

  new PropertyTile('Бар', Groups.saloon, 120, [], 0, 0, 0),
  chanceTile(),
  new PropertyTile('Ночной клуб', Groups.saloon, 120, [], 0, 0, 0),
  new PropertyTile('Ресторан', Groups.saloon, 120, [], 0, 0, 0),

  new PropertyTile('Восточный порт', Groups.transport, 200, [], 0, 0, 0),

  new PropertyTile('Компьютеры', Groups.comunication, 120, [], 0, 0, 0),
  new PropertyTile('Интернет', Groups.comunication, 120, [], 0, 0, 0),
  new PropertyTile(
    'Водопроводная компания',
    Groups.infrastructure,
    120,
    [],
    0,
    0,
    0
  ),
  new PropertyTile('Сотовая связь', Groups.comunication, 120, [], 0, 0, 0),

  new JailTile('Вы арестованы'),

  new PropertyTile('Морские перевозки', Groups.logistic, 120, [], 0, 0, 0),
  new PropertyTile('Железная дорога', Groups.logistic, 120, [], 0, 0, 0),
  bankTile(),
  new PropertyTile('Авиакомпания', Groups.logistic, 120, [], 0, 0, 0),

  new PropertyTile('Южный порт', Groups.transport, 200, [], 0, 0, 0),

  chanceTile(),
  new PropertyTile('Курортная зона', Groups.resort, 200, [], 0, 0, 0),
  new EventTile('Дорогая покупка'),
  new PropertyTile('Гостиничный комплекс', Groups.resort, 200, [], 0, 0, 0)
];

export enum GameStates {
  startOfTurn = 'Start of turn'
}

export class Game {
  tiles: AbstractTile[] = defaultTiles;
  players = [
    new Player('Player 1', '#e91636'),
    new Player('Player 2', '#8fc028')
  ];
  gameState = GameStates.startOfTurn;
  playerTurn = 0;
  roundMoney = 200;

  action = new Subject();

  log = ['Start of game'];

  roll() {
    if (this.gameState !== GameStates.startOfTurn) {
      return;
    }
    const dices = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];
    const player = this.players[this.playerTurn];
    let pos = player.position;
    pos += dices[0] + dices[1];
    this.log.push(`Player ${player.name} rolled ${dices[0]}:${dices[1]}`)
    if (pos >= this.tiles.length - 1) {
      pos -= this.tiles.length;
      this.giveMoney(player, this.roundMoney);
    }
    player.position = pos;
    this.action.next(new MovePlayerAction({ player, newPos: player.position }));
    this.endOfTurn();
  }

  endOfTurn() {
    if (this.playerTurn + 1 >= this.players.length) {
      this.playerTurn = 0;
    } else {
      this.playerTurn += 1;
    }
    this.gameState = GameStates.startOfTurn;
  }

  giveMoney(player: Player, sum) {
    player.money += sum;
    this.log.push(`Player ${player.name} get $${sum}`);
  }
}
