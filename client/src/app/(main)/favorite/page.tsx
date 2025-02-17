import React from "react";
import FavoriteList from "./_components/list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Favorite | Currency Xchange",
};

export default function page() {
    return (
        <>
            <main className="w-full">
                <FavoriteList />
            </main>
        </>
    );
}
