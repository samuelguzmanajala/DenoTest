import { CommandHandler } from "../../../../Shared/domain/CommandHandler.ts";
import { DeleteUserCommand } from "./DeleteUserCommand.ts";
import { UserRemover } from "./UserRemover.ts";
import { Command } from "../../../../Shared/domain/Command.ts";
import { UserId } from "../../domain/value-object/UserId.ts";

export class DeleteUseCommandHandler
  implements CommandHandler<DeleteUserCommand> {
  constructor(private userRemover: UserRemover) {}

  async handle(command: DeleteUserCommand): Promise<void> {
    const userId = new UserId(command.id);
    await this.userRemover.run(userId);
  }

  subscribedTo(): Command {
    return DeleteUserCommand;
  }
}
