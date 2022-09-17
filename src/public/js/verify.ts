import { VerifyRequest, VerifyRequestInterface } from "./classes/requests/verifyrequest";

$(()=>{
    $('#fVerify').on('submit',(e)=>{
        e.preventDefault();
        let activation_code: string = $('#activation_code').val() as string;
        let vr_data: VerifyRequestInterface = {
            activation_code: activation_code
        };
        let vr: VerifyRequest = new VerifyRequest(vr_data);
    });
});