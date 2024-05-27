import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugins';



(async () => {
    await main();
})()

function main() {
    Server.start()
}


