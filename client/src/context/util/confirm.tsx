"use client";
import { ConfirmConfig } from "@/interface/hook/confirm";
import { DefaultProp } from "@/interface/page";
import React, { createContext, useState } from "react";

// Type
type Context = (fn: () => void, text: string) => void;

// Context
export const ConfirmContext = createContext<Context>(() => {});

// Provider
export default function ConfirmProvider(prop: DefaultProp) {
    const [conf, setConf] = useState<ConfirmConfig>({ fn: () => {}, text: "" });

    function onConfirm(fn: () => void, text: string) {
        setConf({ fn, text });
    }

    function toDefault() {
        setConf({
            fn: () => {},
            text: "",
        });
    }

    function onClickOk() {
        conf.fn();
        toDefault();
    }

    return (
        <ConfirmContext.Provider value={onConfirm}>
            {conf.text !== "" ? (
                <div className="fixed h-screen p-4 w-screen z-40 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md border border-gray-500 p-4 rounded-md bg-background">
                        <p className="w-full text-center text-2xl font-semibold mb-4">
                            {conf.text}
                        </p>
                        <div className="text-center">
                            <button
                                onClick={onClickOk}
                                className="px-3 py-1 font-semibold text-xl border border-gray-500 rounded-md text-background min-w-20 bg-foreground mr-4"
                            >
                                Ok
                            </button>
                            <button
                                onClick={toDefault}
                                className="px-3 py-1 font-semibold text-xl border border-gray-500 rounded-md text-foreground bg-background min-w-20 hover:bg-foreground hover:text-background "
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
        </ConfirmContext.Provider>
    );
}
