import Header from "@/components/Header";
import { Metadata } from "next";
import UserSection from "@/components/account/UserSection";

export const metadata: Metadata = {
    title: "Account",
}

export default function Account() {
    return <>
        <Header title="Account"/>
        <UserSection/>
    </>;
};
