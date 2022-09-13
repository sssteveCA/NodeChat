import { MongoDbModelManager, MongoDbModelManagerInterface } from "../mongodbmodelmanager";

export class Account extends MongoDbModelManager{

    constructor(data_parent: MongoDbModelManagerInterface){
        super(data_parent);
    }
}