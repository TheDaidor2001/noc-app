import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import fs from 'node:fs'


export class FileSystemDatasource implements LogDatasource {


    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/log-low.log';
    private readonly mediumLogsPath = 'logs/log-medium.log'; 
    private readonly highLogsPath = 'logs/log-high.log';

    constructor(){
        this.createLogsFiles();
    }


    private createLogsFiles  = () => {
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath);
        } 

        //Ver si existe el archivo
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
            if( fs.existsSync(path) ) return;
            fs.writeFileSync(path, '');
        });

    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = JSON.stringify(newLog) + '\n'

        fs.appendFileSync(this.allLogsPath, logAsJson);

        if(newLog.level === LogServerityLevel.low) return

        if(newLog.level === LogServerityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
            return
        }

        if(newLog.level === LogServerityLevel.high) {
            fs.appendFileSync(this.highLogsPath, logAsJson);
            return
        }
    }

    private getLogsFromFile = (path: string): Promise<LogEntity[]> => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(log => LogEntity.fromJson(log))
        return Promise.resolve(logs)
    }

    async getLogs(serverityLevel: LogServerityLevel): Promise<LogEntity[]> {
        switch (serverityLevel) {
            case LogServerityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogServerityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogServerityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${serverityLevel} not found or implemented`);
        }
    }

}


