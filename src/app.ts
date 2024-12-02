import express, { Application } from "express";
import { Logger } from "winston";

import LoggerManager from "@utilities/logger";
import AppRouter from "@app/routes";

import "reflect-metadata";
import Database from "@config/database";

class Server {
  private app: Application;
  private port: number;
  private appLogger: Logger = LoggerManager.getInstance().get("app");
  private appRouter: AppRouter;

  constructor() {
    this.app = express();
    this.port = 5050;
    this.appRouter = new AppRouter();

    try {
      this.initRoutes();
      this.initDatabase();
    } catch (error) {
      process.exit(1);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.clear();
      this.appLogger.info(
        `Server Running at http://localhost:${this.port}/ or http://127.0.0.1:${this.port}/`
      );
    });
  }

  private initRoutes(): void {
    this.app.use("/api", this.appRouter.router);
  }

  private async initDatabase(): Promise<void> {
    const db = Database.getInstance();

    try {
      await db.connect();
      this.appLogger.info("Database initialization successfully");
    } catch (error) {
      this.appLogger.error("Database initialization failed:", error);
    }
  }
}

const server = new Server();
server.start();
