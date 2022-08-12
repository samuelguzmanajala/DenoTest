import {EventBus} from '../../../../Contexts/Shared/domain/eventBus.ts';
import {UserRepository} from "Contexts/Membership/domain/UserRepository.ts";
import {User} from "Contexts/Membership/domain/user.ts";
import {UserName} from "Contexts/Membership/domain/value-object/UserName.ts";
import {UserId} from "Contexts/Membership/domain/value-object/UserId.ts";
import {UserPassword} from "Contexts/Membership/domain/value-object/UserPassword.ts";
import {UserMail} from "Contexts/Membership/domain/value-object/UserMail.ts";
import {Inject, Service} from "dependencies/deps.ts";

type Params = {
    userId: UserId;
    userName: UserName;
    userPassword: UserPassword;
    userMail: UserMail;
}

@Service()
export class UserCreator{
    constructor(
        @Inject(UserRepository)
        private repository: UserRepository,
        @Inject(EventBus)
        private eventBus: EventBus
    ){
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async run({userId, userName, userPassword, userMail}: Params): Promise<void> {
        const user = User.create(userId, userName, userPassword, userMail);
        await this.repository.save(user);
        await this.eventBus.publish(user.pullDomainEvents());
    }
}
