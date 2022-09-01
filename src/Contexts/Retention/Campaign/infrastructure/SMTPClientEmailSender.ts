import {EmailSender} from "../domain/EmailSender.ts";
import {Email} from "../domain/Email.ts";
import {SMTPClient} from 'smtpclient/mod.ts';
import {Service} from 'di/mod.ts'

@Service()
export class SMTPClientEmailSender implements EmailSender{
  private client: SMTPClient;
  constructor() {
    this.client = new SMTPClient({
      connection: {
        hostname: "smtp.ehu.eus",
        port: 465,
        tls: true,
        auth: {
          username: 'fguzman002@ikasle.ehu.eus',
          password: 'Egelaesunak4k4'
        }
      }
    });
  }
  async send(email: Email): Promise<void> {
    console.log(email);
    await this.client.send({
      from: 'fguzman002@ikasle.ehu.eus',
      to: email.to.value,
      subject: email.subject,
      content: email.body
    })
    await this.client.close();
    console.log('finished');
  }
}