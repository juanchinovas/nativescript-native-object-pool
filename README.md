# nativescript-native-object-pool ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) &amp;  ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

This is a tiny NativeScript's plugin to share objects references between threads (main and Workers)


## Installation

Copy and paste the code below to add this plugin into your app:

```javascript
tns plugin add nativescript-native-object-pool
```

## Usage 

All methods are statics. Just copy the import statament below and invoke the desire method.
	
```typescript
import { NativeObjectPool } from "nativescript-native-object-pool";
```

## API

```typescript 
class NativeObjectPool {
    static add(key: string, value: any): boolean;
    static get(key: string): void;
    static remove(key: string): boolean;
    static removeAll(): void;
}
``` 
## License

Apache License Version 2.0, January 2004
