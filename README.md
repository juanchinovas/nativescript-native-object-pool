# nativescript-native-object-pool

This is a tiny NativeScript's plugin to share objects references between threads (main and Workers threads)


## Installation

Copy and paste the code below to add this plugin into your app:

```javascript
tns plugin add nativescript-native-object-pool
```

## Usage 

All methods are statics. Just copy the import statament below and invoke the desire method.
	
	```typescript
    import { NativeObjectPool } from "nativescript-native-object-pool";
    ```)

## API

```typescript 
NativeObjectPool {
    static add(key: string, value: any): boolean;
    static get(key: string): void;
    static remove(key: string): boolean;
    static removeAll(): void;
}
``` 
## License

Apache License Version 2.0, January 2004
