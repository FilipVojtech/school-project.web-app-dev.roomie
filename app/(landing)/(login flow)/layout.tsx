import React from "react";

export default function LoginFlowTemplate({ children }: { children: React.ReactNode }) {
    return <div className="h-[calc(100dvh-10px)] md:h-[calc(100dvh-20px)] flex flex-col items-center justify-center">
            { children }
    </div>
};
