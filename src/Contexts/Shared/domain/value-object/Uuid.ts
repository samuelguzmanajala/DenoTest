import { v4 } from "v4/mod.ts";
export class Uuid {
    readonly value: string;
    constructor(value: string) {
        this.ensureIsValidUuid(value);
        this.value = value;
    }
    static random(): Uuid {
        return new Uuid(crypto.randomUUID());
    }
    private ensureIsValidUuid(value: string):void {
        if (!v4.validate(value)) {
            throw new Error(`"${value}" is not a valid UUID.`);
        }
    }
    toString(): string {
        return this.value;
    }
}