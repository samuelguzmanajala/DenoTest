import {Controller} from "./Controller.ts";
import {helpers, Context} from "../../../../dependencies/deps.ts";
import {DeleteUserCommand} from "../../../../Contexts/Membership/Users/application/Delete/DeleteUserCommand.ts";
import {
  DeleteUseCommandHandler
} from "../../../../Contexts/Membership/Users/application/Delete/DeleteUseCommandHandler.ts";
import container from "../dependency-injection/Container.ts";
import {UserRemover} from "../../../../Contexts/Membership/Users/application/Delete/UserRemover.ts";

export class UserDeleteController implements Controller {
  async run(ctx: Context): Promise<void> {
        const params = helpers.getQuery(ctx, {mergeParams: true});
        const id = params.id;
        const deleteUserCommand: DeleteUserCommand = new DeleteUserCommand({id});
        const deleteUserCommandHandler: DeleteUseCommandHandler = new DeleteUseCommandHandler(container.get(UserRemover));
        await deleteUserCommandHandler.handle(deleteUserCommand);
        ctx.response.status = 200;
    }
}