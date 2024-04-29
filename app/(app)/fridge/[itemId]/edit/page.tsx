import Header from "@/components/Header";
import { Metadata } from "next";
import { fetchFridgeItem, getFridgeUserOptions } from "@/app/(app)/fridge/_actions";
import EditFridgeItemForm from "@/components/fridge/EditFridgeItemForm";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit item",
}

export default async function EditFridgeItemPage({ params }: { params: { itemId: string } }) {
    const fridgeItem = await fetchFridgeItem(params.itemId);

    if (fridgeItem == null) notFound();

    const options = await getFridgeUserOptions();

    return <>
        <Header title="Edit item"/>
        <main>
            <EditFridgeItemForm item={ fridgeItem } options={ options }/>
        </main>
    </>
};
