import React from "react";

export default function SettingsSection({ children, title }: { title: string, children: React.ReactNode }) {
    return <div className="select-none">
        <div className="text-sm mb-1">{ title }</div>
        <div className="flex flex-col gap-1.5">
            { children }
        </div>
    </div>;
}
