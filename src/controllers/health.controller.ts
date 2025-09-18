import { Request, Response, NextFunction } from "express"
import { dbClient } from '../index'

export const checkMongoDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (dbClient && dbClient.topology?.isConnected()) {
            return res.status(200).send({
                status: 200,
                services: {
                    webserver: "running",
                    database: "running"
                }
            });
        }
        throw Error("MongoDB not connected");
    } catch(err) {
        res.status(503).send({
            status: 503,
            message: err
        });
        next(err);
    }
}