import express from 'express';
import http from 'http';
import environmentVars from './environment.vars';

export class ServerBootstrap {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  public init = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      const PORT = environmentVars.PORT;

      server
        .listen(PORT)
        .on("listening", () => {
          console.log(`Server on port ${PORT}`);
          resolve(true);
        })
        .on("error", (err) => {
            console.error(`Error starting server.`)
            reject(false);
        });
    });
  }
}