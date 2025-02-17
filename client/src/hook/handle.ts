'use client';

import { useAlert } from "./alert";

export function useHandler() {
    const alert = useAlert();
    
    function handler(status:number, body?:string) {
        let text:string = "";
        switch (status) {
            case 400:
                text = "Request is not correct, Please check your request.\n\n" + body;
                break;
            case 404:
                text = "Not Found this path, Please check your url/request.";
                break;
            default:
                text = "Server failed, We apologize for the inconvenience.\n\n" + body;
                break;
        }

        text = text.replace("\n", "<br/>");
        alert({ text });
    }
    
    return handler
}