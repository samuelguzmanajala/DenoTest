import { Email } from "../domain/Email.ts";
import { EmailSender } from "../domain/EmailSender.ts";
import {Service} from 'di/mod.ts'


@Service()
export default class FakeEmailSender implements EmailSender{
    async send(email: Email): Promise<void>{
        console.log('The user with ', email.to.value, ' was registered');
        //do nothing
    }
}