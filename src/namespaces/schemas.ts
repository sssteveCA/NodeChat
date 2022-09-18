//Mongoose schemas

import { Schema } from "mongoose";

export namespace Schemas{
    export const ACCOUNTS: Schema = new Schema({
        username: {type: String, required: true, index: {unique: true}},
        email: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        creationDate: {type: Date, default: Date.now},
        activationCode: {type: String, required: false, index: {unique: true, sparse: true }},
        resetCode: {type: String, required: false, index: {unique: true, sparse: true }},
        verified: {type: Boolean, required: false, default: false},
        resetted: {type: Boolean, required: false, default: false}
    });

    export const TOKENS: Schema = new Schema({
        token_key: {type: String, required: true, index: {unique: true}},
        account_id: {type: String, required: true, index: {unique: true}},
        creation_date: {type: Date, default: Date.now},
        expire_date: {type: Date, required: true}
    });

}