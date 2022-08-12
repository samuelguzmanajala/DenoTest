export abstract class StringValueObject{
    readonly value: string;
    constructor(value: string){
        this.ensureIsValidString(value);
        this.value = value;
    }
    abstract ensureIsValidString(value: string):void;
    toString(): string {
        return this.value;
    }
}