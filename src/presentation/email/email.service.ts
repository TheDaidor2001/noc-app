import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string;
}

//TODO attachment

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: SendEmailOptions): Promise<Boolean> {

        const {htmlBody,subject,to, attachments = []} = options;

        try {

            const sendInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            console.log(sendInformation);
            
            return true;

        } catch (error) {
            console.log(error)
            return false;

        }finally {
            console.log('enviado :D');
            
        }

    }

    async sendEmailWithLogsFiles(to: string | string[]) {
        const subject = 'Logs del servidor'
        const htmlBody = `
                <h3>Logs de sistema - NOC </h3>
                <p>LOrem impsum dolor sit amet</p>
                <p>Ver los adjuntos</p>
        `
        const attachments: Attachment[] = [
            {filename: 'logs-low.log', path: './logs/log-low.log'},
            {filename: 'logs-medium.log', path: './logs/log-medium.log'},
            {filename: 'logs-high.log', path: './logs/log-high.log'},
        ]

        return this.sendEmail({
            to, 
            subject,
            htmlBody,
            attachments
        })

    }


}