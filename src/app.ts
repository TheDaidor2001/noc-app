import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from "./data/mongo";




(async () => {
    await main();
})()

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL, 
        dbName: envs.MONGO_DB_NAME
    })

    Server.start()
}


