import { Command } from "../../domain/Command.ts";
import { CommandBus } from "../../domain/CommandBus.ts";
import { Types } from "../../domain/types.ts";
import { Inject, Service } from "di/mod.ts";
import { CommandHandlersInformation } from "./CommandHandlersInformation.ts";

@Service()
export class InMemoryCommandBus implements CommandBus {
  constructor(
    @Inject(
      Types.commandHandlersInformation,
    ) private commandHandlersInformation: CommandHandlersInformation,
  ) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command);
    await handler.handle(command);
  }
}
