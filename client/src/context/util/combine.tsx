import { DefaultProp } from "@/interface/page";
import React from "react";
import ConfirmProvider from "./confirm";
import AlertProvider from "./alert";
import LoadProvider from "./load";

export default function UtilProvider(prop: DefaultProp) {
    return (
        <ConfirmProvider>
            <AlertProvider>
                <LoadProvider>{prop.children}</LoadProvider>
            </AlertProvider>
        </ConfirmProvider>
    );
}
