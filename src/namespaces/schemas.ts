//Mongoose schemas

import mongoose, {ObjectId, Schema } from "mongoose";

export namespace Schemas{
    export const ACCOUNTS: Schema = new Schema({
        username: {type: String, required: true, index: {unique: true}},
        email: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        creationDate: {type: Date, required: true},
        activationCode: {type: String, required: false, index: {unique: true, sparse: true }},
        resetCode: {type: String, required: false, index: {unique: true, sparse: true }},
        verified: {type: Boolean, required: false, default: false},
        resetted: {type: Boolean, required: false, default: false}
    });

    export const TOKENS: Schema = new Schema({
        tokenKey: {type: String, required: true, index: {unique: true}},
        accountId: {type: Schema.Types.ObjectId, required: true, index: {unique: true}},
        creationDate: {type: Date, required: true},
        expireDate: {type: Date, required: true}
    });

}