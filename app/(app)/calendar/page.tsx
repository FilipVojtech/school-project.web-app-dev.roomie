"use client";

import React from "react";
import DatePicker from "@/components/calendar/DatePicker";
import CalendarItem from "@/components/calendar/CalendarItem";

export default function CalendarPage() {
    const [ date, setDate ] = React.useState<Date>(new Date());
    const data: { [key: string]: { id: string, title: string }[] } = {
        "Wed Apr 10 2024": [ { id: "1", title: "Recycle bins" } ],
        "Mon Apr 08 2024": [
            { id: "2", title: "General waste" },
            { id: "8ae68b31-dedf-4ea0-88d9-32b84b2c213f", title: "General waste" },
            { id: "1daf4855-eac7-4184-8bf4-949908745b63", title: "General waste" },
            { id: "0b7e010b-0e51-486b-938a-dfdce9faf858", title: "General waste" },
            { id: "33955c13-3db6-4a66-a8c0-0080afc5cd22", title: "General waste" },
            { id: "9ccf0589-9223-415f-bbc2-fadf741a6577", title: "General waste" },
            { id: "209fa302-d36d-4220-9668-a8a070a291f0", title: "General waste" },
            { id: "8b35c3e1-2ec6-4d6e-b2db-23f2d6d99686", title: "General waste" },
            { id: "586aa671-27a4-41c8-ad12-83c0e1e1ceaa", title: "General waste" },
            { id: "6e164c16-9fe6-4a9d-8aba-f88e7e8dd565", title: "General waste" },
            { id: "8107c859-16c5-4193-9d5b-d9377c877577", title: "General waste" },
            { id: "9912eaa3-9ce2-4c98-ad15-d740f618f379", title: "General waste" },
            { id: "866e96e4-9b41-493a-8740-8af50f24a26b", title: "General waste" },
            { id: "b62b01b6-7c7b-4ac9-b3e2-c7c61fd11505", title: "General waste" },
            { id: "796894fc-3875-40d2-be3e-b529254e6599", title: "General waste" },
            { id: "1974b9ec-28c4-4252-96cb-146a21339f84", title: "General waste" },
            { id: "8a912f06-2c8b-439b-90e9-bbb383977104", title: "General waste" },
            { id: "fdc8a3a9-f08c-4be7-83c2-29f9f27b2033", title: "General waste" },
            { id: "0250e998-b586-4ad6-8810-5d552e25a4ee", title: "General waste" },
            { id: "ed5e3ef3-3b35-4acd-b47f-fd49be863bba", title: "General waste" },
            { id: "13a894fc-e135-45bf-bad9-2df8f40e158b", title: "General waste" },
            { id: "53e133cb-b950-4b83-a1ea-a79355daa296", title: "General waste" },
            { id: "e0fc0029-3778-45cc-a361-37cc04e664eb", title: "General waste" },
            { id: "c6d0e149-643f-4643-882e-fc696fac8627", title: "General waste" },
            { id: "57f1574b-7e51-42a4-972f-09620789ea1f", title: "General waste" },
        ],
    };

    return <>
        <DatePicker date={ date } setDate={ setDate }/>

        <div className="grid md:grid-cols-2 grow gap-1 md:gap-1.5">
            { data[date.toDateString()] && data[date.toDateString()].map(
                value => <CalendarItem id={ value.id } title={ value.title } key={ value.id }/>
            ) }
        </div>
    </>;
};
