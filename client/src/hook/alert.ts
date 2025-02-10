'use client';

import { AlertContext } from "@/context/util/alert";
import { AlertConfig } from "@/interface/hook/alert";
import { useContext } from "react";

export function useAlert() {
    const alert = useContext(AlertContext);

    function activateAlert(conf:AlertConfig) {
        alert(conf.text, conf.cb);
    }

    return activateAlert;
}