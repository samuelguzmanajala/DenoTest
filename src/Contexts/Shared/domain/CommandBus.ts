import { Command } from "./Command.ts";
export abstract class CommandBus {
  abstract dispatch(command: Command): Promise<void>;
}
