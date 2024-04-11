import Header from "@/components/Header";
import { Metadata } from "next";
import UserSection from "@/components/account/UserSection";
import GeneralSection from "@/components/account/GeneralSection";
import AccountSection from "@/components/account/AccountSection";
import HouseholdManagementSection from "@/components/account/HouseholdManagementSection";
import LegalSection from "@/components/account/LegalSection";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Account",
}

export default function Account() {
    return <>
        <Header title="Account"/>
        <div className="md:w-1/2 md:mx-auto">
            <UserSection/>
            <div className="flex flex-col gap-4 bg-[#E2E8F0] p-2.5 mt-10 rounded-lg">
                <GeneralSection/>
                <AccountSection/>
                <HouseholdManagementSection/>
                <LegalSection/>
                <Button variant="destructive">Log out</Button>
            </div>
        </div>
    </>;
};
