export class Dice {
  constructor(public first: number, public second: number) {}

  static randomize() {
    const dice = Math.floor(Math.random() * 6) + 1;
    return dice;
  }

  static roll() {
    // return new Dice(15, 15);
    return new Dice(Dice.randomize(), Dice.randomize());
  }

  isDouble() {
    return this.first === this.second;
  }

  stepsToGo() {
    return this.first + this.second;
  }

  toString() {
    return `${this.first}:${this.second}`;
  }
}
