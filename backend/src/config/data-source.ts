import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root", // Default to 'root' if not set
  password: process.env.DB_PASSWORD || "", // Default to an empty password if not set
  database: process.env.DB_NAME || "agenda", // Default to 'agenda' if not set
  entities: [path.resolve(__dirname, "../entities/**/*.ts")],
  migrations: [path.resolve(__dirname, "../migrations/**/*.ts")],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error initializing Data Source", err));
