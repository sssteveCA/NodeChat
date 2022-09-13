
//Regular expression list

export namespace Regexs{
    export const EMAIL:string = '^[a-zA-Z]{4,30}@([a-zA-Z0-9]{3,30}\\.){1,5}[a-z]{2,10}$';
    export const PASSWORD:string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
}