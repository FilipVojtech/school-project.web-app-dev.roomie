import Header from "@/components/Header";
import AddFridgeItemForm from "@/components/fridge/AddFridgeItemForm";
import { getFridgeUserOptions } from "@/app/(app)/fridge/_actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add item",
}

export default async function AddFridgePage() {
    const options = await getFridgeUserOptions();

    return <>
        <Header title="Add item"/>
        <main>
            <AddFridgeItemForm options={ options }/>
        </main>
    </>;
}
