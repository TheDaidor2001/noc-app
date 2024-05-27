import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service"
import { EmailService } from "./email/email.service";



const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)




export class Server {


    public static start() {
        console.log('Server started...')

        //TODO - Mandar email

        // const emailService = new EmailService();
        // emailService.sendEmailWithLogsFiles([
        //     'danielcastillobalboa@gmail.com',
        //     'maxidaidor@gmail.com'
        // ]);

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com/'
        //         new CheckService(
        //             () => console.log(`${url} is OK`),
        //             (error) => console.log(error),
        //             fileSystemRepository
                    
        //         ).execute(url)
        //         // new CheckService().execute('http://localhost:3000/')
        //     }
        // );
    }

}