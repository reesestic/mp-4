import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Home | Mood Sound Picker',
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}