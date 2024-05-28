import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        
        const newLog = await LogModel.create(log)
        console.log('Mongo log created', newLog.id);

    }
    async getLogs(serverityLEvel: LogServerityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: serverityLEvel
        })
        return logs.map(log => LogEntity.fromObject(log))
    }
}