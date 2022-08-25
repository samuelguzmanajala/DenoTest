import { UserName } from "../../domain/value-object/UserName.ts";
import { UserId } from "../../domain/value-object/UserId.ts";
import { UserMail } from "../../domain/value-object/UserMail.ts";
import { UserPassword } from "../../domain/value-object/UserPassword.ts";
import { UserCreator } from "./UserCreator.ts";
import { CreateUserCommand } from "./CreateUserCommand.ts";
import { CommandHandler } from "../../../../Shared/domain/CommandHandler.ts";
import { Command } from "../../../../Shared/domain/Command.ts";

export class CreateUserCommandHandler
  implements CommandHandler<CreateUserCommand> {
  constructor(private courseCreator: UserCreator) {}

  subscribedTo(): Command {
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<void> {
    const userId = new UserId(command.id);
    const userName = new UserName(command.name);
    const userPassword = new UserPassword(command.password);
    const userMail = new UserMail(command.mail);
    await this.courseCreator.run({ userId, userName, userPassword, userMail });
  }
}
