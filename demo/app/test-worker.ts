import "tns-core-modules/globals";
import { NativeObjectPool } from "nativescript-native-object-pool";

const context: Worker = self as any;

context.onmessage = function(msg: any) {

    if ((<any>global)["NSThread"]) {
        console.log("worker started.:  ", NSThread.currentThread.name);
    } else {
        console.log("worker started.:  ", java.lang.Thread.currentThread().getName());
    }

    var request = msg.data;
    request.forEach(key => {
        const typo: any = NativeObjectPool.get(key);
        /*if (key === "ImKeyFunc" && ios) {
            const t: NSDictionary<any, any> = typo;
            console.log("malone.: ", t.keyEnumerator().nextObject());
            
        }*/
        console.log(`Getting.: ${key}`, typo);
    });

    (<any>global).postMessage({ done: true });
};