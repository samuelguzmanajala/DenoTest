import {Command} from "./Command.ts";

export interface CommandHandler<T extends Command> {
    subscribedTo(): Command;
    handle(command: T): Promise<void>;
}