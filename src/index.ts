import { postgresConnection } from "./infrastructure/config/database.postgres";
import { ServerBootstrap } from "./infrastructure/config/server.bootstrap";
import app from "./infrastructure/config/App";

const server = new ServerBootstrap(app);

(async () => {
  try {
    await postgresConnection();
    const instances = [server.init()];
    await Promise.all(instances);
  } catch (err) {
    console.error("Error starting server.", err);
  }
})();
