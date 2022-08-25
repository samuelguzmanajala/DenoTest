import { Command } from "../../domain/Command.ts";
import { CommandBus } from "../../domain/CommandBus.ts";
import { CommandHandlersInformation } from "./CommandHandlersInformation.ts";

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);
    await handler.handle(command);
  }
}
