import { SignInContext } from "@/context/login";
import { useContext } from "react";

export default function useSignInRequire() {
    const activate = useContext(SignInContext);
    return activate;
}