
export namespace Constants{

    //export const CONTAINER: string = "container"; //Class of page content body
    export const CONTAINER: string = "my-container"; //Class of page content body
    export const BACKGROUND: string = "background"; //Class of site background image
    export const PORT: number = 3000;
    export const HOSTNAME: string = 'localhost';
    const SCHEME:string = 'http';
    export const MAIN_URL: string = SCHEME+'://'+HOSTNAME+':'+PORT;

    //MongoDB
    export const MONGODB_ACCOUNTS_COLLECTION = 'accounts';

    /**
     * The duration of the token_key when user login
     */
    export const TOKEN_DURATION_SECONDS: number = 900; 

    //Keys
    export const KEY_CODE: string = "code";
    export const KEY_DONE: string = "done";
    export const KEY_MESSAGE: string = "message";
    export const KEY_TOKEN: string = "token_key";
    export const KEY_USERNAME: string = "username";
}