import SettingsSection from "@/components/account/SettingsSection";
import SettingsItem from "@/components/account/SettingsItem";
import { ArrowLeftRight, Pencil, Users, XOctagon } from "lucide-react";
import ChangeHouseHoldNameOption from "@/components/account/household-management-section/ChangeHouseholdNameOption";
import { fetchHouseholdName } from "@/app/(app)/account/_actions";

export default async function HouseholdManagementSection() {
    const householdName = await fetchHouseholdName() ?? "";

    return <SettingsSection title="Household Management">
        <ChangeHouseHoldNameOption name={householdName}/>
        <SettingsItem title="Members" icon={ <Users/> }/>
        <SettingsItem title="Transfer ownership" icon={ <ArrowLeftRight/> } hidden/>
        <SettingsItem title="Disband household" icon={ <XOctagon/> } destructive/>
    </SettingsSection>;
};
