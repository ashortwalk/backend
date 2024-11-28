export declare class Gmail {
    toEmail: string;
    subject: string;
    text: string;
    constructor(toEmail: string, subject: string, text: string);
    send(): Promise<boolean>;
}
