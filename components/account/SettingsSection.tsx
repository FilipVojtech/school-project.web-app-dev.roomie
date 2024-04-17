import React from "react";
import { Label } from "@/components/ui/label";

export default function SettingsSection({ children, title }: { title: string, children: React.ReactNode }) {
    return <div className="select-none">
        <Label htmlFor={ title.toLowerCase() } className="mb-1">{ title }</Label>
        <div id={ title.toLowerCase() } className="flex flex-col gap-1.5">
            { children }
        </div>
    </div>;
}
