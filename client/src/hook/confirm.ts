'use client';

import { ConfirmContext } from "@/context/util/confirm";
import { ConfirmConfig } from "@/interface/hook/confirm";
import { useContext } from "react";

export function useConfirm() {
    const confirm = useContext(ConfirmContext);
    
    function activateConfirm(conf:ConfirmConfig) {
        confirm(conf.fn, conf.text);
    }

    return activateConfirm
}