import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account",
}

export default function Account() {
    return <>
        <Header title="Account"/>
        Welcome to your account.
    </>;
};
