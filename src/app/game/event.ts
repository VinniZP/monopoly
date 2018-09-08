export abstract class TileEvent {
  text: string;
  abstract action(): void;
}
