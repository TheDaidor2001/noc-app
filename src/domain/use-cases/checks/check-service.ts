import { LogEntity, LogServerityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"


interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>
}


type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {


    constructor(
        private readonly successCallback: SuccessCallback, 
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository
    ){}


    async execute( url: string ): Promise<boolean> {

        try {
            const req = await fetch(url)
            if(!req.ok) {
                throw new Error('Service is offline')
            }

            const log = new LogEntity(`Service ${url} working`, LogServerityLevel.low);
            this.logRepository.saveLog(log)
            this.successCallback && this.successCallback();
        
            return true

        } catch (error) {

            const errorString = `${url} is not ok. ${error}`;
            const log = new LogEntity(errorString, LogServerityLevel.high)

            this.logRepository.saveLog(log)
            
            this.errorCallback && this.errorCallback(errorString)
            return false
        }

    }

}

