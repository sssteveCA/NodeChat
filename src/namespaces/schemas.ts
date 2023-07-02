//Mongoose schemas

import { Schema } from "mongoose";

namespace SubSchemas{
    export const ACCOUNTS_CONTACTS: Schema = new Schema({
        email: {type: String, default: ""},
        phone: {type: String, default: ""},
        socials: {type: Map, of: String}
    },{_id: false});

    export const ACCOUNTS_IMAGE: Schema = new Schema({
        coverImage: {type: String, default: ""},
        profileImage: {type: String, default: ""},
        userImages : [{
            url: {type: String, required: true},
            uploadDate: {type: Date, default: Date.now}
        }]
    },{_id: false});

    export const ACCOUNTS_VIDEO: Schema = new Schema({
        url: {type: String, required: true},
        uploadDate: {type: Date, default: Date.now}
    });

    export const ACCOUNTS_OTHER_PERSONALS: Schema = new Schema({
        birthDate: {type:Date, default: null},
        birthPlace: {type: String, default: ""},
        residence: {
            address: {type: String, default: ""},
            city: {type: String, default: ""},
            number: {type: Number, required: false, min: 1}
        },
        sex: {type: String, enum: ["","M","F"], default: ""}
    },{_id: false});
}

export namespace Schemas{
    export const ACCOUNTS: Schema = new Schema({
        name: {type: String, required: true},
        surname: {type: String, required: true},
        username: {type: String, required: true, index: {unique: true}},
        email: {type: String, required: true, index: {unique: true}},
        password: {type: String, required: true},
        creationDate: {type: Date, required: true},
        activationCode: {type: String, required: false, index: {unique: true, sparse: true }},
        resetCode: {type: String, required: false, index: {unique: true, sparse: true }},
        verified: {type: Boolean, required: false, default: false},
        resetted: {type: Boolean, required: false, default: false},
        contacts: {type: SubSchemas.ACCOUNTS_CONTACTS, default: {}},
        education: {
            secondary: {type: String, default: ""},
            university: {type: String, default: ""}
        },
        employment: {type: String, default: ""},
        images : {type: SubSchemas.ACCOUNTS_IMAGE, default: {}},
        otherPersonals: {type: SubSchemas.ACCOUNTS_OTHER_PERSONALS, default: {}},
        videos : {type: SubSchemas.ACCOUNTS_VIDEO, default: []}
    });

    export const TOKENS: Schema = new Schema({
        tokenKey: {type: String, required: true, index: {unique: true}},
        accountId: {type: Schema.Types.ObjectId, required: true, index: {unique: true}},
        creationDate: {type: Date, required: true},
        expireDate: {type: Date, required: true}
    });

    export const PHOTOS: Schema = new Schema({
        accountId: {type: Schema.Types.ObjectId, required: true, index: true},
        creationDate: {type: Date, default: Date.now},
        path: {type: String, required: true}
    });

    export const VIDEOS: Schema = new Schema({
        accountId: {type: Schema.Types.ObjectId, required: true, index: true},
        creationDate: {type: Date, default: Date.now},
        path: {type: String, required: true},
        type: {type: String, required: true}
    });

}