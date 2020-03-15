export declare class NativeObjectPool {
    static add(key: string, value: any): boolean;
    static get(key: string): void;
    static remove(key: string): boolean;
    static removeAll(): void;
}
