//Mongoose schemas

import { Schema } from "mongoose";

export namespace Schemas{
    export const ACCOUNTS: Schema = new Schema({
        username: {type: String, index: {unique: true}},
        email: {type: String, index: {unique: true}},
        password: String,
        creationDate: {type: Date, default: new Date()},
        activationCode: {type: String, index: {unique: true}},
        resetCode: {type: String, index: {unique: true}},
        isVerified: Boolean,
        isResetted: Boolean
    });

}