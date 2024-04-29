import Header from "@/components/Header";
import { Metadata } from "next";
import UserSection from "@/components/account/UserSection";
import GeneralSection from "@/components/account/GeneralSection";
import AccountSection from "@/components/account/AccountSection";
import HouseholdManagementSection from "@/components/account/HouseholdManagementSection";
import LegalSection from "@/components/account/LegalSection";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
    title: "Account",
}

export default async function Account() {
    const session = await auth();
    if (!session?.user) {
        return <p>Couldn&apos;t load component</p>
    }

    const { name, initials, email } = session.user;

    return <>
        <Header title="Account"/>
        <main className="md:w-1/2 md:mx-auto">
            <UserSection name={ name } initials={ initials } email={ email }/>
            <div className="flex flex-col gap-4 bg-foreground p-2.5 mt-10 rounded-lg">
                <GeneralSection/>
                <AccountSection/>
                <HouseholdManagementSection/>
                <LegalSection/>
                <LogoutButton/>
            </div>
        </main>
    </>;
};

function LogoutButton() {
    return <form
        action={ async () => {
            "use server";
            await signOut();
        } }
        className="w-full"
    >
        <Button variant="destructive" className="w-full">Log out</Button>
    </form>
}
