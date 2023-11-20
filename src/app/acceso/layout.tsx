
import React from "react";
import AlternateLayout from "../layouts/AlternateLayout";

export default function MainLayout({children,}: { children: React.ReactNode}) {

    return (
        <>
            <AlternateLayout>
                {children}
            </AlternateLayout>

        </>

    )
}