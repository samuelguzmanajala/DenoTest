import { MotherCreator } from "./MotherCreator.ts";

export class IntegerMother {
  static random(max?: number): number {
    return MotherCreator.random().random.number(max);
  }
}
