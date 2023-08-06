import { AxiosError } from 'axios';
interface UserInputType {
    [key: string]: any;
}
export declare class DevFlow {
    apiKey: string;
    private static instance;
    private constructor();
    static initialize(apiKey: string): DevFlow;
    captureGeneralError(error: Error): void;
    captureAJAXError(error: AxiosError): void;
    captureUIInterfaceError(error: Error, event: Event, target: EventTarget): void;
    captureFromInputError(error: Error, userInput: UserInputType): void;
}
export {};
