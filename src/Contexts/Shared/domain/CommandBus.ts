import { Command } from "./Command.ts";
export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}
