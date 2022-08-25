import { faker } from "faker/mod.ts";
import { Faker } from "faker/lib/mod.ts";

export class MotherCreator {
  static random(): Faker {
    return faker;
  }
}
