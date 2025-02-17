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
                    <div className="w-full max-w-md border border-gray-500 bg-blue-950/30 p-6 rounded-md text-white">
                        <h1 className="text-center font-bold text-3xl">
                            Alert !!
                        </h1>
                        <p className="w-full indent-6 my-4">{conf.text}</p>
                        <div className="text-center text-xl">
                            <button
                                onClick={toDefault}
                                className="text-gray-800 mt-2"
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
