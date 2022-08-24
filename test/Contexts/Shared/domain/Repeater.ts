import { IntegerMother } from "./IntegerMother.ts";

export class Repeater {
    // deno-lint-ignore ban-types
    static random(callable: Function, iterations: number) {
        return Array(iterations || IntegerMother.random(20)).fill({}).map(()=> callable());
    }
}