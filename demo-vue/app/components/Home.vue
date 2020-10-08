<template>
    <Page>
        <ActionBar>
            <Label text="Home"/>
        </ActionBar>

         <StackLayout>
            <!-- Add your page content here -->
            
            <Button text="click Me to add" @tap="addSomeReference"></Button>
            <Button text="click Me to print keys" @tap="printSomeReference"></Button>
            <Button text="click Me to remove keys" @tap="removeSomeReference"></Button>
            <Button text="click Me to remove all" @tap="removeAllReferences"></Button>
            <Button text="Run Worker" @tap="startThread"></Button>
        </StackLayout>
    </Page>
</template>

<script>
import { Observable } from "@nativescript/core/data/observable";
import { ios } from "@nativescript/core/application";

import { NativeObjectPool } from "nativescript-native-object-pool";

const TestWorker = require("nativescript-worker-loader!../test.worker.js");

  export default {
    methods: {
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
        },

        printSomeReference() {
            const keys = ["","ImKeyArray", "ImKeyObject", "ImKeyNativeListObject", "ImKeyFunc"];

            keys.forEach(key => {
                const typo = NativeObjectPool.get(key);
                console.log(`Getting.: ${key}`, typo);
            });
        },

        removeSomeReference() {
            const keys = ["","ImKeyArray", "ImKeyObject", "ImKeyNativeListObject", "ImKeyFunc"];

            keys.forEach(key => {
                console.log(`Removing.: ${key}`, NativeObjectPool.remove(key));
            });
        },

        removeAllReferences() {
            console.log(`Removing all at onece`, NativeObjectPool.removeAll());
        },

        startThread() {
            if (ios) {
                console.log("main thread.: ", NSThread.currentThread.name);
            } else {
                console.log("main thread.: ", java.lang.Thread.currentThread().getName());
            }
            
            const worker = new TestWorker();
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
  };
</script>

<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
