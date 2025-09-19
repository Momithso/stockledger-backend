import { Request, Response, NextFunction } from "express"
import { app } from '../index'
import jwt from 'jsonwebtoken'
import { Db } from "mongodb";

const db: Db = app.locals.db;

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    
}