import { CreateUserCommand } from "../../../../../src/Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import { User } from "../../../../../src/Contexts/Membership/Users/domain/User.ts";
import { UserId } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserId.ts";
import { UserMail } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserMail.ts";
import { UserName } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserName.ts";
import { UserPassword } from "../../../../../src/Contexts/Membership/Users/domain/value-object/UserPassword.ts";
import { UserIdMother } from "../../Shared/domain/UserId.ts";

import { UserMailMother } from "./UserMailMother.ts";
import { UserNameMother } from "./UserNameMother.ts";
import { UserPasswordMother } from "./UserPasswordMother.ts";

export class UserMother{
    static create(id: UserId, name: UserName, password: UserPassword, mail:UserMail): User{
        return new User(id, name, password, mail);
    }

    static fromCommand(command: CreateUserCommand):User{
        return this.create(
            UserIdMother.create(command.id),
            UserNameMother.create(command.name),
            UserPasswordMother.create(command.password),
            UserMailMother.create(command.mail)
        )
    }

    static random(): User{
        return this.create(UserIdMother.random(), UserNameMother.random(), UserPasswordMother.random(), UserMailMother.random());
    }
}