
/**
 * This type is used when a new Account document is inserted
 */
export type AccountType = {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    creationDate: string;
    activationCode: string;
}