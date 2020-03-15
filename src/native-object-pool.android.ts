import { canBeWrapped } from './native-object-pool.common';

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
        let outterValue = value;
        if (!(value instanceof java.lang.Object)
            && canBeWrapped(value) && !(value instanceof Array)) {
            outterValue = convertJSObjectToNativeMap(value);
        }

        if (value instanceof Array) {
            outterValue = convertJSArrayToNative(value);
        }

        // @ts-ignore
        return com.jnovas.ObjectPool.getInstance().add(key, outterValue);
    }    

    /**
     * Get and return the object value by a key
     * @param key 
     * 
     * @returns {any} object
     */
    static get(key: string): any {
        // @ts-ignore
        const value = com.jnovas.ObjectPool.getInstance().get(key);
        
        if (value && value instanceof java.util.HashMap) {
            return convertNativeMapToJSObject(value);
        }
        if (value && value instanceof java.util.ArrayList) {
            return convertNativeArrayToJS(value);
        }
        return value;
    }

    /**
     * Remove a object from the pool by key
     * @param key 
     * 
     * @returns {Boolean} done
     */
    static remove(key: string): boolean {
        // @ts-ignore
        return com.jnovas.ObjectPool.getInstance().remove(key);
    }

    /**
     * Remove all object in the pool
     */
    static removeAll(): void {
        // @ts-ignore
        com.jnovas.ObjectPool.getInstance().removeAll();
    }
}

/**
 * Convert array from JS to native Java
 * @param {Array<any>} jsArray 
 */
function convertJSArrayToNative(jsArray: Array<any>): java.util.ArrayList<any> {
    const nativeArray = new java.util.ArrayList<any>();
    for (let i = 0, l = jsArray.length; i < l; i++) {
        nativeArray.add(fromJSToNativePrimitive(jsArray[i]));
    }

    return nativeArray;
}

/**
 * Convert array from native Java to JS
 * @param {java.util.ArrayList<any>} nativeArray 
 */
function convertNativeArrayToJS(nativeArray: java.util.ArrayList<any>): Array<any> {
    const jsArray = [];
    for (let i = 0, l = nativeArray.size(); i < l; i++) {
        jsArray.push(nativeArray.get(i));
    }

    return jsArray;
}

/**
 * Convert Object from JS to native Java
 * @param {any} jsObject 
 */
function convertJSObjectToNativeMap(jsObject: any): java.util.HashMap<string, any> {
    const nativeMap = new java.util.HashMap<string, any>();
    for (let key in jsObject) {
        if (jsObject.hasOwnProperty(key)) {
            nativeMap.put(key, jsObject[key]);
        }
    }

    return nativeMap;
}

/**
 * Convert Map from native Java to JS
 * @param {java.util.HashMap<string, any>} nativeMap 
 */
function convertNativeMapToJSObject(nativeMap: java.util.HashMap<string, any>): any {
    const jsObject = {};
    const entries = nativeMap.entrySet().iterator();
    while (entries.hasNext()) {
        const entry = entries.next();
        jsObject[entry.getKey()] = entry.getValue();
    }

    return jsObject;
}

/**
 * convert primitive type from JS to Java
 * @param value 
 */
function fromJSToNativePrimitive(value: any): any {
    
    if (Number.isInteger(value)) {
        return new java.lang.Integer(value.toString());
    }

    if (!isNaN(Number(value))) {
        return new java.lang.Double(value.toString());
    }

    return value;
}
