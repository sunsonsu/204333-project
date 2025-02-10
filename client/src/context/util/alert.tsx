"use client";
import { AlertConfig } from "@/interface/hook/alert";
import { DefaultProp } from "@/interface/page";
import React, { createContext, useState } from "react";

// Type
type Context = (text: string, cb?: () => void) => void;

// Context
export const AlertContext = createContext<Context>(() => {});

// Provider
export default function AlertProvider(prop: DefaultProp) {
    const [conf, setConf] = useState<AlertConfig>({ text: "" });

    function onAlert(text: string, cb?: () => void) {
        setConf({ text, cb });
    }

    function toDefault() {
        if (conf.cb) {
            conf.cb();
        }
        setConf({ text: "" });
    }

    return (
        <AlertContext.Provider value={onAlert}>
            {conf.text !== "" ? (
                <div className="fixed h-screen p-4 w-screen z-40 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md border border-gray-500 p-4 rounded-md bg-background">
                        <h1 className="text-center font-bold text-3xl">
                            Alert !!
                        </h1>
                        <p className="w-full indent-6 my-4">{conf.text}</p>
                        <div className="text-center">
                            <button
                                onClick={toDefault}
                                className="px-3 py-1 font-semibold text-xl border border-gray-500 rounded-md text-foreground bg-background hover:bg-foreground hover:text-background "
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {prop.children}
        </AlertContext.Provider>
    );
}
