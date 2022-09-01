import { EmailAddress } from "../domain/EmailAddress.ts";
import { EmailSender } from "../domain/EmailSender.ts";
import { WelcomeUserEmail } from "../domain/WelcomeUserEmail.ts";
import { WelcomeUserEmailError } from "../domain/WelcomeUserEmailError.ts";

export default class SendWelcomeUserEmail{
    constructor(private emailSender: EmailSender){}
    
    async run(userEmailAddress: EmailAddress): Promise<void> {
        const welcomeUserEmail = new WelcomeUserEmail(userEmailAddress);
        try{
            await this.emailSender.send(welcomeUserEmail);
        }catch( error ){
            throw new WelcomeUserEmailError(userEmailAddress);
        }
    }
}