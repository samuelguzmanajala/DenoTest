import { CreateUserCommand } from 'Contexts/Membership/application/Create/CreateUserCommand.ts';
import { CommandHandler } from 'Contexts/Shared/domain/CommandHandler.ts';
import { UserCreator } from 'Contexts/Membership/application/Create/UserCreator.ts';
import { Command } from 'Contexts/Shared/domain/Command.ts';
import {UserId} from "Contexts/Membership/domain/value-object/UserId.ts";
import {UserName} from "Contexts/Membership/domain/value-object/UserName.ts";
import {UserPassword} from "Contexts/Membership/domain/value-object/UserPassword.ts";
import {UserMail} from "Contexts/Membership/domain/value-object/UserMail.ts";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
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
