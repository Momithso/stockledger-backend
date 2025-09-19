import { BSONType, Db } from "mongodb";
import { app } from "../..";

const db: Db = app.locals.db

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            BSONType: "object",
            required: [],
            properties: {
                name: { BSONType: "string" },
                email: { BSONType: "string" },
                password: { BSONType: "string" },
            }
        }
    }
})