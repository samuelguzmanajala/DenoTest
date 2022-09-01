import { Email } from "./Email.ts";
import { EmailAddress } from "./EmailAddress.ts";

export class WelcomeUserEmail extends Email {
  constructor(to: EmailAddress) {
    super({
      from: new EmailAddress("fguzman002@ikasle.ehu.eus"),
      to,
      subject: "welcome",
      body: "Welcome to our platfrom",
    });
  }
}
