import { Email } from "./Email.ts";
import {Service} from 'di/mod.ts'

@Service()
export abstract class EmailSender{
    abstract send(email:Email): Promise<void>;
}