import { LoadContext } from "@/context/util/load";
import { useContext } from "react";

export function useLoader() {
    const loader = useContext(LoadContext);

    function onSetLoad(s:boolean) {
        loader(s);
    }

    return onSetLoad
}