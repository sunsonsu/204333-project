import { DefaultProp } from "@/interface/page";
import React from "react";
import Navbar from "../_components/nav/navbar";

export default function layout(prop: DefaultProp) {
    return (
        <>
            <Navbar />
            {prop.children}
        </>
    );
}
