import Header from "@/components/Header";
import CreateHouseholdForm from "@/app/(landing)/create-household/CreateHouseholdForm";
import { Button } from "@/components/ui/button";
import DeleteAccountButton from "@/app/(landing)/create-household/DeleteAccountButton";
import { signOut } from "@/auth";

/// Figma screen: https://www.figma.com/file/m6ybqytKATbynqITBD2ouw/Roomie-app?type=design&node-id=33-2358&mode=design&t=1V3zR9deQflJyBJX-4
export default async function CreateHouseholdPage() {
    return <main className="space-y-2 h-full">
        <Header title="Create Household" disableAccount className="justify-center"/>
        <div className="flex flex-col items-center h-full">
            <div className="m-auto">
                <div className="bg-foreground p-1.5 md:p-2 md:w-96 rounded-md">
                    <CreateHouseholdForm/>
                </div>
                <form action={ async () => {
                    "use server";
                    await signOut();
                } }>
                    <Button
                        variant="link"
                        className="text-destructive w-full no-underline"
                        type="submit"
                    >
                        Log out
                    </Button>
                </form>
                <DeleteAccountButton/>
            </div>
        </div>
    </main>;
}
