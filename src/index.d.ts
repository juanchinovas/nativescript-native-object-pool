export declare class NativeObjectPool {
    static add(key: string, value: any): boolean;
    static get(key: string): any;
    static remove(key: string): boolean;
    static removeAll(): void;
}
