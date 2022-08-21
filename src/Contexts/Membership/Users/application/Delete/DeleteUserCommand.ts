import {Command} from "../../../../Shared/domain/Command.ts";

type Params = {
  id: string;
}

export class DeleteUserCommand extends Command {
  id: string;
  constructor({id}: Params) {
    super();
    this.id = id;
  }
}