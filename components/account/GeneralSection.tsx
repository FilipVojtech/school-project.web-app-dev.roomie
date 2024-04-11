"use client";

import { Moon, HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SettingsItem from "@/components/account/SettingsItem";
import SettingsSection from "@/components/account/SettingsSection";

export default function GeneralSection() {
    function changeDarkMode(): void {

    }

    return <SettingsSection title="General">
        <SettingsItem title="Dark mode" icon={ <Moon/> } onClick={ changeDarkMode } hidden>
            <Switch/>
        </SettingsItem>
        <SettingsItem title="Help & FAQ" icon={ <HelpCircle/> }/>
    </SettingsSection>
};
