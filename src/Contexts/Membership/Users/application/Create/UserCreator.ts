import { UserName } from "../../domain/value-object/UserName.ts";
import { UserRepository } from "../../domain/UserRepository.ts";
import { UserId } from "../../domain/value-object/UserId.ts";
import { UserMail } from "../../domain/value-object/UserMail.ts";
import { UserPassword } from "../../domain/value-object/UserPassword.ts";
import { User } from "../../domain/User.ts";
import "reflection";
import { Inject, Service } from "di/mod.ts";
import { EventBus } from "../../../../Shared/domain/eventBus.ts";
import { Types } from "../../../../Shared/domain/types.ts";
import container from "../../../../../Apps/Membership/backend/dependency-injection/Container.ts";

type Params = {
  userId: UserId;
  userName: UserName;
  userPassword: UserPassword;
  userMail: UserMail;
};

@Service()
export class UserCreator {
  @Inject(UserRepository)
  private repository: UserRepository;
  @Inject(Types.EventBus)
  private eventBus: EventBus;
  constructor(repository: UserRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(
    { userId, userName, userPassword, userMail }: Params,
  ): Promise<void> {
    const user = User.create(userId, userName, userPassword, userMail);
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
