

export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityoptions {
    message: string;
    level: LogServerityLevel;
    createdAt?: Date;
    origin: string,
}

export class LogEntity {

    public level: LogServerityLevel; //Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options : LogEntityoptions){
        const {level,message,origin,createdAt = new Date()} = options
        this.message = message
        this.level = level;
        this.createdAt = createdAt
        this.origin = origin
        
    }


    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}' : json
        const { message, level, createdAt, origin } = JSON.parse(json);

       

        const log = new LogEntity({
            message, 
            level, 
            origin, 
            createdAt
        });

        return log;
    }


    static fromObject = (obj: {[key: string]: any}): LogEntity => {
        const {message, level, origin, createdAt} = obj

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });

        return log;
    }

}

