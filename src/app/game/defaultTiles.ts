import { bankEvents } from './events/bank';
import { Groups } from './groups';
import { EventTile } from './tiles/event.tile';
import { JailTile } from './tiles/jail.tile';
import { ParkingTile } from './tiles/parking.tile';
import { PrisonTile } from './tiles/prison.tile';
import { PropertyTile } from './tiles/property.tile';
import { StartTile } from './tiles/start.tile';
import { TaxTile } from './tiles/tax.tile';
import { AbstractTile } from './tiles/tile';


const chanceTile = () => new EventTile('Шанс', bankEvents);
const bankTile = () => new EventTile('Казна', bankEvents);

export const defaultTiles: AbstractTile[] = [
  new StartTile('Start'),
  new PropertyTile('Старая дорога', Groups.road, 60, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Главная дорога', Groups.road, 60, [1, 2, 3, 4, 5], 0, 0, 0),
  bankTile(),
  new TaxTile('Налог с дохода', 200),
  new PropertyTile('Западный порт', Groups.transport, 200, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Аквапарк', Groups.entertainment, 100, [1, 2, 3, 4, 5], 0, 0, 0),
  chanceTile(),
  new PropertyTile('Городской парк', Groups.entertainment, 100, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile(
    'Горнолыжный курорт',
    Groups.entertainment,
    120,
    [1, 2, 3, 4, 5],
    0,
    0,
    0
  ),
  new PrisonTile('Тюрьма'),
  new PropertyTile('Спальный район', Groups.district, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile(
    'Электрическая компания',
    Groups.infrastructure,
    120,
    [1, 2, 3, 4, 5],
    0,
    0,
    0
  ),
  new PropertyTile('Деловой квартал', Groups.district, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Торговая площадь', Groups.district, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Северный порт', Groups.transport, 200, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Спальный район', Groups.street, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  bankTile(),
  new PropertyTile('Деловой квартал', Groups.street, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Торговая площадь', Groups.street, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new ParkingTile('Бесплатная парковка'),

  new PropertyTile('Бар', Groups.saloon, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  chanceTile(),
  new PropertyTile('Ночной клуб', Groups.saloon, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Ресторан', Groups.saloon, 120, [1, 2, 3, 4, 5], 0, 0, 0),

  new PropertyTile('Восточный порт', Groups.transport, 200, [1, 2, 3, 4, 5], 0, 0, 0),

  new PropertyTile('Компьютеры', Groups.comunication, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Интернет', Groups.comunication, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile(
    'Водопроводная компания',
    Groups.infrastructure,
    120,
    [1, 2, 3, 4, 5],
    0,
    0,
    0
  ),
  new PropertyTile('Сотовая связь', Groups.comunication, 120, [1, 2, 3, 4, 5], 0, 0, 0),

  new JailTile('Вы арестованы'),

  new PropertyTile('Морские перевозки', Groups.logistic, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  new PropertyTile('Железная дорога', Groups.logistic, 120, [1, 2, 3, 4, 5], 0, 0, 0),
  bankTile(),
  new PropertyTile('Авиакомпания', Groups.logistic, 120, [1, 2, 3, 4, 5], 0, 0, 0),

  new PropertyTile('Южный порт', Groups.transport, 200, [1, 2, 3, 4, 5], 0, 0, 0),

  chanceTile(),
  new PropertyTile('Курортная зона', Groups.resort, 200, [1, 2, 3, 4, 5], 0, 0, 0),
  new EventTile('Дорогая покупка', []),
  new PropertyTile('Гостиничный комплекс', Groups.resort, 200, [1, 2, 3, 4, 5], 0, 0, 0)
];
