
export namespace Messages{
    const ADMIN_CONTACT: string = "Se il problema persiste, contatta l'amministratore del sito";
    
    //Errors
    export const ERROR_ACCOUNT_DELETE: string = "Errore durante la rimozione del tuo account";
    export const ERROR_ADD_PHOTO: string = "Errore durante l'aggiunta dell'immagine";
    export const ERROR_CONTACTSINFORMATION_UPDATE: string = "Errore durante la modifica delle informazioni di contatto";
    export const ERROR_EDUCATION_UPDATE: string = "Errore durante la modifica delle informazioni sull'istruzione";
    export const ERROR_EMPLOYMENT_UPDATE: string = "Errore durante la modifica delle informazioni sul lavoro";
    export const ERROR_INCORRECTFORMAT: string = "I dati inseriti non sono nel formato corretto, riprova";
    export const ERROR_INVALIDCREDENTIALS: string = "Il nome utente o la password non sono corretti, riprova";
    export const ERROR_MISSINGDATA: string = "Inserisci i dati richiesti per continuare";
    export const ERROR_NOTAUTHENTICATED: string = "Non sei autenticato";
    export const ERROR_PASSWORD_MISMATCH: string = "Le due password non coincidono";
    export const ERROR_PERSONALINFORMATION_UPDATE: string = "Errore durante la modifica delle informazioni personali";
    export const ERROR_PHOTOS_GET: string = "Errore durante il caricamento delle tue foto";
    export const ERROR_COVER_IMAGE: string = "Errore durante la modifica dell'immagine di copertina";
    export const ERROR_PROFILE_IMAGE:string = "Errore durante la modifica dell'immagine del profilo";
    export const ERROR_SERVER: string = "Siamo spiacenti, il server non è in grado di elaborare la tua richiesta. "+ADMIN_CONTACT;
    export const ERROR_SESSIONEXPIRED: string = "La tua sessione è scaduta";
    export const ERROR_USERNOTFOUND: string = "Utente non trovato";

    

}