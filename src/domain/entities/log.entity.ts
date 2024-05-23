

export enum LogServerityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}


export class LogEntity {

    public level: LogServerityLevel; //Enum
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogServerityLevel ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }


    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);

        if(!message) throw new Error('Invalid message');
        if(!level) throw new Error('Invalid level');
        if(!createdAt) throw new Error('Invalid createdAt');

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);
        return log;
    }

}

