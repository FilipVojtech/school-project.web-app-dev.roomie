import Header from "@/components/Header";
import AddEventForm from "@/components/calendar/AddEventForm";
import { getFrequencyOptions } from "@/app/(app)/calendar/_actions";

export const metadata = {
    title: "Add event",
}

export default async function CalendarAddPage() {
    const frequencyOptions = await getFrequencyOptions();

    return <>
        <Header title="Add item"/>
        <main>
            <AddEventForm frequencyOptions={ frequencyOptions }/>
        </main>
    </>
}
