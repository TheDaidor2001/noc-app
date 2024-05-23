import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository";
import { CronService } from "./cron/cron-service"



const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)




export class Server {


    public static start() {
        console.log('Server started...')
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com/'
                new CheckService(
                    () => console.log(`${url} is OK`),
                    (error) => console.log(error),
                    fileSystemRepository
                    
                ).execute(url)
                // new CheckService().execute('http://localhost:3000/')
            }
        );
    }

}