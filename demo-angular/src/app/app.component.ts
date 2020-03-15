import { NativeObjectPool } from 'nativescript-native-object-pool';

import { ios } from "tns-core-modules/application";
import { Component } from "@angular/core";
// @ts-ignore
import * as TestWorker from "nativescript-worker-loader!../test.worker";


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 
    addSomeReference() {
        let isDone = NativeObjectPool.add("", "This is a string referemce");
        console.log("was Done.: ", isDone);

        isDone = NativeObjectPool.add("ImKeyArray", [12,45,12]);
        console.log("ImKeyArray was Done.: ", isDone);

        isDone = NativeObjectPool.add("ImKeyObject", {
            "keyObj": "Juanchi Novas",
            "keyTestFrom": "Testing form demo app"
        });
        console.log("ImKeyObject was Done.: ", isDone);

        if (!ios) {
            isDone = NativeObjectPool.add("ImKeyNativeListObject", java.util.Collections.singletonList("Testin on demo app"));
            console.log("ImKeyNativeListObject was Done.: ", isDone);
        } else {
            // @ts-ignore
            const array = new NSMutableArray();
            array.addObject("loTestin on demo app");
            array.addObject("jdsk");

            isDone = NativeObjectPool.add("ImKeyNativeListObject", array);
            console.log("ImKeyNativeListObject was Done.: ", isDone);
        }


        isDone = NativeObjectPool.add("ImKeyFunc", function(arg) {
            console.log(arg, "ImKeyFunc");
        });
        console.log("ImKeyFunc was Done.: ", isDone);
    }

    printSomeReference() {
        const keys = ["","ImKeyArray", "ImKeyObject", "ImKeyNativeListObject", "ImKeyFunc"];

        keys.forEach(key => {
            const typo = NativeObjectPool.get(key);
            console.log(`Getting.: ${key}`, typo);
        });
    }

    removeSomeReference() {
        const keys = ["","ImKeyArray", "ImKeyObject", "ImKeyNativeListObject", "ImKeyFunc"];

        keys.forEach(key => {
            console.log(`Removing.: ${key}`, NativeObjectPool.remove(key));
        });
    }

    removeAllReferences() {
        console.log(`Removing all at onece`, NativeObjectPool.removeAll());
    }

    startThread() {
        if (ios) {
            console.log("main thread.: ", NSThread.currentThread.name);
        } else {
            console.log("main thread.: ", java.lang.Thread.currentThread().getName());
        }
        const worker: Worker = new TestWorker();
        worker.onmessage = (msg) => {
            console.log("message received by the worker");
            console.log(msg);

            worker.terminate();
        }

        worker.postMessage(["","ImKeyArray", "ImKeyObject", "ImKeyNativeListObject", "ImKeyFunc"]);

        worker.onerror = function(err) {
            console.log(`An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`);
            console.log(err.message);
        }
    }
}
