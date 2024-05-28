import { LogServerityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron.service"
import { EmailService } from "./email/email.service";



const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new MongoLogDatasource()
)




export class Server {


    public static async start() {
        console.log('Server started...')

        //TODO - Mandar email

        // const emailService = new EmailService();
        // emailService.sendEmailWithLogsFiles([
        //     'danielcastillobalboa@gmail.com',
        //     'maxidaidor@gmail.com'
        // ]);

        const logs = await logRepository.getLogs(LogServerityLevel.high)
        console.log(logs);
        
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com/'
                new CheckService(
                    () => console.log(`${url} is OK`),
                    (error) => console.log(error),
                    logRepository
                    
                ).execute(url)
            }
        );
    }

}