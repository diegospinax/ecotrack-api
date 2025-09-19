import cors from "cors";
import express from 'express';
import globalErrorHandler from "../middleware/error-handler.middleware";
import userRoutes from '@/infrastructure/routes/user-routes';
import authRoutes from '@/infrastructure/routes/auth-routes';

class App {
    private app: express.Application;

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes () {
        this.app.use("/api/v1", userRoutes);
        this.app.use("/api/v1", authRoutes);
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.use(globalErrorHandler);
    }

    public getApp() {
        return this.app;
    }
}

export default new App().getApp();