let id = 1;

export class Player {
  id: number = id++;
  money = 10000;
  position = 0;
  jailed = false;

  constructor(public name: string, public color: string) {
  }
}
