import { Command } from "../../Command.ts";

export interface Middleware<T extends Command>{
    handle(command: T): void;
}