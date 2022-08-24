import { MotherCreator } from "./MotherCreator.ts";

export class UuidMother {
    static random():string {
        return MotherCreator.random().random.uuid();
    }
}