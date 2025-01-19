'use client';

import { SyntheticEvent } from "react";

export function formParser<T>(e:SyntheticEvent):T {
    const form:{ [key:string]: FormDataEntryValue } = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    return form as T;
}