import { MotherCreator } from "./MotherCreator.ts";

export class MailMother {
  static random(): string {
    return MotherCreator.random().internet.email();
  }
}
