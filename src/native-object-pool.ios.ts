declare var ObjectPool: any;

/**
 * Final class to handler the Object pool
 */
export class NativeObjectPool {
    /**
     * Add reference to the pool
     * @param {string} key 
     * @param {any} value 
     * 
     * @returns {Boolean} done
     */
    static add(key: string, value: any): boolean {
        return ObjectPool.sharedInstance().addWithValue(key, value);
    }

    /**
     * Get and return the object value by a key
     * @param key 
     * 
     * @returns {any} object
     */   
    static get(key: string): any {
        const value = ObjectPool.sharedInstance().get(key);
        if (value && value instanceof NSDictionary) {
            return convertNativeMapToJSObject(value);
        }
        if (value && value instanceof NSArray) {
            return convertNativeArrayToJS(value);
        }
        return value
    }

    /**
     * Remove a object fromthe pool by key
     * @param key 
     * 
     * @returns {Boolean} done
     */
    static remove(key: string): boolean {
        return ObjectPool.sharedInstance().remove(key);
    }

    /**
     * Remove all object in the pool
     */
    static removeAll(): void {
        ObjectPool.sharedInstance().removeAll();
    }
}

/**
 * Convert array from native Java to JS
 * @param {NSArray<any>} nativeArray 
 */
function convertNativeArrayToJS(nativeArray: NSArray<any>): Array<any> {
    const jsArray = [];
    for (let i = 0, l = nativeArray.count; i < l; i++) {
        jsArray.push(nativeArray.objectAtIndex(i));
    }

    return jsArray;
}

/**
 * Convert Map from native Java to JS
 * @param {NSDictionary<string, any>} nativeMap 
 */
function convertNativeMapToJSObject(nativeMap: NSDictionary<string, any>): any {
    const jsObject = {};
    const keys = nativeMap.allKeys;
    for (let i = 0, l = keys.count; i < l; i++) {
        const key = keys.objectAtIndex(i);
        jsObject[key] = nativeMap.valueForKey(key);
    }

    return jsObject;
}
