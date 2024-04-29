import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { headers } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Note not found",
}

export default async function FridgeItemNotFound() {
    const headersList = headers();
    // const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";
    const pathSegments = fullUrl.split("/");

    return <>
        <Header title="Note not found"/>
        <main className="flex flex-col gap-4">
            { pathSegments.length > 2 &&
                <div className="w-full bg-foreground">
                    <code className="p-5 border-2 rounded-md block w-full">
                        Note ID: { pathSegments[pathSegments.length - 2] }
                    </code>
                </div>
            }
            <div>
                Possible reasons why
                <ul className="list-disc list-inside">
                    <li>You don&apos;t have access to it</li>
                    <li>It was deleted</li>
                </ul>
            </div>
            <div>
                <Button asChild>
                    <Link href="/notes">Go back to notes</Link>
                </Button>
            </div>
        </main>
    </>
};
