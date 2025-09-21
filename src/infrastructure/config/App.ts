import cors from "cors";
import express from 'express';
import globalErrorHandler from "../middleware/error-handler.middleware";
import userRoutes from '@/infrastructure/routes/user-routes';
import authRoutes from '@/infrastructure/routes/auth-routes';
import personRoutes from '@/infrastructure/routes/person-routes';
import taskRoutes from '@/infrastructure/routes/task-routes';
import lessonRoutes from '@/infrastructure/routes/lesson-routes';
import badgeRoutes from '@/infrastructure/routes/badge-routes';
import achievementRoutes from '@/infrastructure/routes/achievement-routes';
import challengeRoutes from '@/infrastructure/routes/challenge-routes';
import courseRoutes from '@/infrastructure/routes/course-routes';

class App {
    private app: express.Application;

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes () {
        const PREFIX = "/api/v1";

        this.app.use(PREFIX, userRoutes);
        this.app.use(PREFIX, authRoutes);
        this.app.use(PREFIX, personRoutes);
        this.app.use(PREFIX, taskRoutes);
        this.app.use(PREFIX, lessonRoutes);
        this.app.use(PREFIX, badgeRoutes);
        this.app.use(PREFIX, achievementRoutes);
        this.app.use(PREFIX, challengeRoutes);
        this.app.use(PREFIX, courseRoutes);
        
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