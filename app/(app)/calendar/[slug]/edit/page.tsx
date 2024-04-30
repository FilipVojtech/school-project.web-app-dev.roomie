import Header from "@/components/Header";
import AddEventForm from "@/components/calendar/AddEventForm";
import { fetchEvent, getFrequencyOptions } from "@/app/(app)/calendar/_actions";
import EditEventForm from "@/components/calendar/EditEventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { slug: string } }) {
    const data = await fetchEvent(params.slug);
    if (data == null) notFound();
    const frequencyOptions = await getFrequencyOptions();

    return <>
        <Header title="Edit item"/>
        <main>
            <EditEventForm data={ data } frequencyOptions={ frequencyOptions }/>
        </main>
    </>
};
