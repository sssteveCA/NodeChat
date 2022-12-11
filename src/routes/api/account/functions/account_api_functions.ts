import { Paths } from "../../../../namespaces/paths";

export function setUsernameObject(obj: object): object{
    let usernameObject: object = {
        name: obj["result"]["name"], surname: obj["result"]["surname"], email: obj["result"]["email"],
        contacts: obj["result"]["contacts"], education: obj["result"]["education"],
        employment: obj["result"]["employment"],
        images: obj["result"]["images"], otherPersonals: obj["result"]["otherPersonals"],
        videos: obj["result"]["videos"],
    };
    if(!usernameObject["images"] || !usernameObject["images"]["profileImage"] || usernameObject["images"]["profileImage"] == ""){
       usernameObject["images"]["profileImage"] = "../.."+Paths.STATIC_IMG_DEFAULT+"/profile_image.jpg";
    }
    if(!usernameObject["images"] || !usernameObject["images"]["coverImage"] || usernameObject["images"]["coverImage"] == ''){
        usernameObject["images"]["coverImage"] = "../.."+Paths.STATIC_IMG_DEFAULT+"/cover_image.jpg";
    } 
    return usernameObject;
}