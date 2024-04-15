import SettingsSection from "@/components/account/SettingsSection";
import SettingsItem from "@/components/account/SettingsItem";
import { FileText } from "lucide-react";

export default function LegalSection() {
    return <SettingsSection title="Legal">
        <SettingsItem title="Privacy Policy" icon={ <FileText/> }/>
        <SettingsItem title="Terms and Conditions" icon={ <FileText/> }/>
    </SettingsSection>
};
