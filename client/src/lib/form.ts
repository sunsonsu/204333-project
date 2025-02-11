'use client';

import { ChangeEvent, SyntheticEvent } from "react";
import { isNumber } from "./general";

export function formParser<T>(e:SyntheticEvent):T {
    const form:{ [key:string]: FormDataEntryValue } = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    return form as T;
}

export function numberOnly(e:ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return;
    const val = e.target.value
    if (!isNumber(val)) {
        e.target.value = val.slice(0, val.length-1);
    }
}