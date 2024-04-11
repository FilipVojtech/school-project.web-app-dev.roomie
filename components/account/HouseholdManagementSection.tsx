import SettingsSection from "@/components/account/SettingsSection";
import SettingsItem from "@/components/account/SettingsItem";
import { ArrowLeftRight, Pencil, Users, XOctagon } from "lucide-react";

export default function HouseholdManagementSection() {
    return <SettingsSection title="Household Management">
        <SettingsItem title="Change household name" icon={ <Pencil/> }/>
        <SettingsItem title="Members" icon={ <Users/> }/>
        <SettingsItem title="Transfer ownership" icon={ <ArrowLeftRight/> }/>
        <SettingsItem title="Disband household" icon={ <XOctagon/> } destructive/>
    </SettingsSection>;
};
