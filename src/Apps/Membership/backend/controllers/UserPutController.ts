import { Controller } from "./Controller.ts";
import { CreateUserCommand } from "../../../../Contexts/Membership/Users/application/Create/CreateUserCommand.ts";
import container from "../dependency-injection/Container.ts";
import { Context, helpers } from "oak/mod.ts";
import { CommandBus } from "../../../../Contexts/Shared/domain/CommandBus.ts";
import { Service, Inject } from "di/mod.ts";

type UserBody = {
  id: string;
  name: string;
  mail: string;
  password: string;
};

@Service()
export class UserPutController implements Controller {

  @Inject(CommandBus)
  private commandBus: CommandBus;

  constructor(commandBus: CommandBus){
    this.commandBus = commandBus;
  }
  async run(ctx: Context): Promise<void> {
    //Arreglar en un futuro para que use el del THIS
    const commandBus = container.get(CommandBus);
    const requestBody = ctx.request.body({
      contentTypes: {
        json: ["application/json"],
        form: ["multipart", "urlencoded"],
        text: ["text"],
      },
    });
    const body: Object = await requestBody.value;
    const params = helpers.getQuery(ctx, { mergeParams: true });
    const user: UserBody = { ...(body as UserBody), id: params.id };
    const createUserCommand: CreateUserCommand = new CreateUserCommand({
      ...user,
    });

    await commandBus.dispatch(createUserCommand);
   /* const createUserCommandHandler: CreateUserCommandHandler =
      new CreateUserCommandHandler(container.get(UserCreator));
    await createUserCommandHandler.handle(createUserCommand);
    */
    ctx.response.status = 200;
    //console.log(this.commandBus);
  }
}
