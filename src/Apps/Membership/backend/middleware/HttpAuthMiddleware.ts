import { CommandBus } from "../../../../Contexts/Shared/domain/CommandBus.ts";

export class HttpAUthMiddleware {
  private bus: CommandBus;
  constructor(bus: CommandBus) {
    this.bus = bus;
  }

  private hasIntroducedCredentials(authorizationHeader: string): boolean {
    return null !== authorizationHeader;
  }

  private authenticate() {
    authorizationHeader:
    String;
  }
}
