import { MotherCreator } from "./MotherCreator.ts";

export class WordMother {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }
}
