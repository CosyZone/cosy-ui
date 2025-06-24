import { Logger } from 'pino'

declare module 'pino-caller' {
    interface Options {
        relativeTo?: string;
        messageKey?: string;
        messageFormat?: (msg: string, callSite: string) => string;
    }

    export default function caller(logger: Logger, options?: Options): Logger;
} 
