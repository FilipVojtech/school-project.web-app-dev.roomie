import SettingsSection from "@/components/account/SettingsSection";
import SettingsItem from "@/components/account/SettingsItem";
import { ImageIcon } from "lucide-react"
import ChangeNameOption from "@/components/account/account-section/ChangeNameOption";
import ChangeEmailOption from "@/components/account/account-section/ChangeEmailOption";
import { auth } from "@/auth";
import ChangePasswordOption from "@/components/account/account-section/ChangePasswordOption";
import LeaveHouseholdOption from "@/components/account/account-section/LeaveHouseholdOption";
import DeleteAccountOption from "@/components/account/account-section/DeleteAccountOption";

export default async function AccountSection() {
    const session = await auth();

    return <SettingsSection title="Account">
        <SettingsItem title="Update profile picture" icon={ <ImageIcon/> } hidden/>
        <ChangeNameOption firstName={ session?.user.firstName! } lastName={ session?.user.lastName! }/>
        <ChangeEmailOption/>
        <ChangePasswordOption/>
        <LeaveHouseholdOption/>
        <DeleteAccountOption/>
    </SettingsSection>;
}
