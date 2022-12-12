import { Paths } from "../../../../namespaces/paths";

export function setUsernameObject(obj: object, baseUrl: string): object{
    let usernameObject: object = {
        name: obj["result"]["name"], surname: obj["result"]["surname"], email: obj["result"]["email"],
        contacts: obj["result"]["contacts"], education: obj["result"]["education"],
        employment: obj["result"]["employment"],
        images: obj["result"]["images"], otherPersonals: obj["result"]["otherPersonals"],
        videos: obj["result"]["videos"],
    };
    if(!usernameObject["images"] || !usernameObject["images"]["profileImage"] || usernameObject["images"]["profileImage"] == ""){
       usernameObject["images"]["profileImage"] = baseUrl+Paths.STATIC_IMG_DEFAULT+"/profile_image.jpg";
    }
    else{
        usernameObject["images"]["profileImage"] = baseUrl+usernameObject["images"]["profileImage"];
    }
    if(!usernameObject["images"] || !usernameObject["images"]["coverImage"] || usernameObject["images"]["coverImage"] == ''){
        usernameObject["images"]["coverImage"] = baseUrl+Paths.STATIC_IMG_DEFAULT+"/cover_image.jpg";
    }
    else{
        usernameObject["images"]["coverImage"] = baseUrl+usernameObject["images"]["coverImage"];
    }
    return usernameObject;
}