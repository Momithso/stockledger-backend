import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { api } from "../utils/logger";
import { validateRequest } from "../utils/validate";
import { userModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import { CreateUserError, CreateUserAnswer, User } from "../types/user.type";
import { app } from "..";

const saltRounds = 10;

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const data: User = {
        name: req.body?.name,
        email: req.body?.email,
        password: req.body?.password,
        createdAt: new Date(Date.now()).getTime()
    }

    const _token = req.headers.authorization?.split(" ")[1];

    let err: CreateUserError = {
        status: 400,
        message: "Bad Request"
    }

    try {
        // check request data
        err.message = "Missing Arguments";
        if (!validateRequest(data)) return res.status(err.status).json(err);
        if (!_token) return res.status(err.status).json(err);
        
        // check token
        err.status = 401;
        err.message = "Unauthorized";
        let verifyErr;
        jwt.verify(_token, app.locals.jwt.privateKey, { algorithms: ['RS256'] } ,(_err: any, decoded: any) => {
            verifyErr = _err;
        })
        if (verifyErr) return res.status(err.status).json(err);

        // check if user is already there with this email
        const _user = await userModel.findOne({ email: data.email });
        err.status = 400;
        err.message = "There is already a user with this email";
        if (_user) return res.status(err.status).json(err);

        // hash password
        data.password = await bcrypt.hash(data.password, saltRounds);

        // store new user
        await userModel.create(data);

        // Send results and log
        api.info("Created user: " + data.email);
        const answer: CreateUserAnswer = {
            status: 200,
            message: "User successfully created"
        }
        res.status(200).json(answer);
    } catch (err) {
        api.warn(err);
        res.status(500).json({
            status: 500,
            message: err
        })
    }
}