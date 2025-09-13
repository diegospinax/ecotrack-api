import { DataSource } from "typeorm";
import environmentVars from "./environment.vars";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: environmentVars.DB_HOST,
  port: Number(environmentVars.DB_PORT),
  username: environmentVars.DB_USER,
  password: environmentVars.DB_PASSWORD,
  database: environmentVars.DB_NAME,
  schema: environmentVars.DB_SCHEMA,
  synchronize: true,
  entities: []
});

export const postgresConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Succesfully connected database.");
  } catch (e) {
    console.error("Cannot connect to postgres database: ", e);
    process.exit(1);
  }
}