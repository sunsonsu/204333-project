import useFavorite from "@/hook/fav";
import useSignInRequire from "@/hook/signin";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Prop {
    name: string;
    rate: number;
    fav?: boolean;
    favFunc: (name: string, status: boolean) => void;
}

export default function Card(prop: Prop) {
    const param = useSearchParams();
    const { replace } = useRouter();
    const { onFavorite, onUnfavorite } = useFavorite();
    const loginRequire = useSignInRequire();

    function onClickFrom() {
        const to = param.get("to");
        if (to) {
            if (to === prop.name) replace(`/?from=${prop.name}`);
            else replace(`/?from=${prop.name}&to=${to}`);
        } else replace(`/?from=${prop.name}`);
    }

    function onClickTo() {
        const from = param.get("from");
        if (from) {
            if (from === prop.name) replace(`/?to=${prop.name}`);
            else replace(`/?from=${from}&to=${prop.name}`);
        } else replace(`/?to=${prop.name}`);
    }

    async function onClickFavorite() {
        const status = await onFavorite(prop.name);
        if (status === 200) {
            prop.favFunc(prop.name, true);
        } else loginRequire(true);
    }

    async function onClickUnfavorite() {
        const status = await onUnfavorite(prop.name);
        if (status === 200) {
            prop.favFunc(prop.name, false);
        } else loginRequire(true);
    }

    return (
        <li className="p-2 px-4 bg-blue-950/30 relative rounded-md flex justify-between hover:scale-[1.01] transition-transform">
            <div className="text-white z-10">
                <h1 className="font-bold">{prop.name}</h1>
                <h2 className="text-xs text-gray-500">{prop.rate} per $</h2>
            </div>

            <div className="flex gap-4 items-center z-10">
                <button onClick={onClickFrom} className="b">
                    From
                </button>
                <button onClick={onClickTo}>To</button>
                {prop.fav ? (
                    <FaHeart
                        onClick={onClickUnfavorite}
                        className="text-white text-2xl cursor-pointer z-20 transition-transform hover:scale-105"
                    />
                ) : (
                    <FaRegHeart
                        onClick={onClickFavorite}
                        className="text-white text-2xl cursor-pointer z-20 transition-transform hover:scale-105"
                    />
                )}
            </div>

            <Link
                className="w-full h-full absolute top-0 left-0"
                href={`/coin/${prop.name}`}
            ></Link>
        </li>
    );
}
