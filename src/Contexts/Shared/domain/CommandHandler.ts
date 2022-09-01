import { Command } from "./Command.ts";

export abstract class CommandHandler<T extends Command> {
  abstract subscribedTo(): Command;
  abstract handle(command: T): Promise<void>;
}
