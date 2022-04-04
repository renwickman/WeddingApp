
export class MissingResourceError {

    message:string;
    description:string = "The resource could not be found";

    constructor(message:string){
        this.message = message;
    }
}

export class OverdrawnError {

    message:string;
    description:string = "Insufficient Funds";

    constructor(message:string){
        this.message = message;
    }

}