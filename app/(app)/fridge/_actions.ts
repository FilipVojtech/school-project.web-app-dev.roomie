"use server";

import { z } from "zod";
import { FridgeItemFormSchema } from "@/lib/schema";
import { Option } from "@/components/ui/multiple-selector";
import { createClient, sql } from "@vercel/postgres";
import { FridgeItem, User } from "@/lib/definitions";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getFridgeUserOptions(): Promise<Option[]> {
    const session = await auth();
    const returnValue: Option[] = []

    if (!session?.user) {
        return returnValue;
    }

    let users: User[];

    try {
        const results = await sql<User>`
            SELECT *
            FROM users
            WHERE household_id = ${ session.user.householdId }
        `;

        users = results.rows;
    } catch (error) {
        return returnValue;
    }

    users.forEach(user => {
        let fixed: boolean = user.id === session.user.id;
        returnValue.push({
            value: user.id,
            label: `${ user.first_name } ${ user.last_name }`,
            fixed,
        })
    })

    return returnValue;
}

export async function addFridgeItem(data: z.infer<typeof FridgeItemFormSchema>) {
    const session = await auth();
    const fail = { success: false, message: "Couldn't add item." }

    if (!session?.user) return fail;

    const parsedData = FridgeItemFormSchema.safeParse(data);

    if (!parsedData.success) return fail;

    const { name, quantity, expiryDate, owners } = parsedData.data;

    const client = createClient();
    await client.connect();
    try {
        const result = await client.sql`
            INSERT INTO fridge_items(name, quantity, expiry_date, household_id)
            VALUES (${ name }, ${ quantity }, ${ expiryDate?.toISOString() }, ${ session.user.householdId })
            RETURNING id;
        `;

        const itemId = result.rows[0]['id'] as string;

        for (const { value: ownerId } of owners) {
            await client.sql`
                INSERT INTO fridge_items_owners
                VALUES (${ itemId }, ${ ownerId });
            `;
        }
    } catch (error) {
        console.error("Couldn't create fridge item", data);
        return fail;
    } finally {
        await client.end();
    }

    revalidatePath("/fridge");
    return { success: true, message: "Item created" };
}

export async function fetchUserFridgeItems() {
    const session = await auth();
    let returnValue: FridgeItem[] = [];

    if (!session?.user) return returnValue;

    try {
        const result = await sql<FridgeItem>`
            SELECT id,
                   household_id,
                   name,
                   quantity,
                   expiry_date,
                   (SELECT concat(u.first_name, ' ', u.last_name) FROM users u WHERE u.id = id LIMIT 1) AS owners
            FROM fridge_items
                     JOIN fridge_items_owners fio ON fridge_items.id = fio.item_id
            WHERE fio.owner_id = ${ session.user.id };
        `;

        returnValue = result.rows;
    } catch (error) {
        console.error("Error fetching fridge items", session.user.id)
        return returnValue;
    }

    return returnValue;
}

export async function fetchFridgeItem(id: string): Promise<FridgeItem | null> {
    const session = await auth();
    const fail = null;

    if (!session?.user) return fail;

    try {
        const results = await sql<FridgeItem>`
            SELECT id,
                   household_id,
                   name,
                   quantity,
                   expiry_date,
                   (SELECT concat(u.first_name, ' ', u.last_name) FROM users u WHERE u.id = id LIMIT 1) AS owners
            FROM fridge_items
            WHERE id = ${ id };
        `;
        return results.rows[0];
    } catch (error) {
        // console.error("Couldn't fetch fridge item", id)
        return fail;
    }
}

export async function deleteFridgeItem(id: string) {
    const session = await auth();
    if (!session?.user) return { success: false, message: "Couldn't delete fridge item" };

    const client = createClient();
    await client.connect();
    try {
        const result = await client.sql<{ item_id: string, owner_id: string }>`
            SELECT *
            FROM fridge_items_owners
            WHERE item_id = ${ id }
              AND owner_id = ${ session.user.id };
        `;

        const fridgeItem = result.rows;
        if (fridgeItem.length != 1) return { success: false, message: "You don't have permission to delete this item." }

        await client.sql`
            DELETE
            FROM fridge_items_owners
            WHERE item_id = ${ id };
        `;

        await client.sql`
            DELETE
            FROM fridge_items
            WHERE id = ${ id };
        `;
    } catch (error) {
        console.error("Error deleting fridge item", session.user.id, id);
        return { success: false, message: "Couldn't delete fridge item" };
    } finally {
        await client.end()
    }

    revalidatePath("/fridge");
    return { success: true, message: "Item deleted", redirectTo: "/fridge" };
}

export async function updateFridgeItem(id: string, data: z.infer<typeof FridgeItemFormSchema>) {
    const session = await auth();

    if (!session?.user) return { success: false, message: "Couldn't update fridge item" };

    const parsedData = FridgeItemFormSchema.safeParse(data);

    if (!parsedData.success) return { success: false, message: "Couldn't update fridge item" };

    const { name, quantity, expiryDate, owners } = parsedData.data;

    const client = createClient();
    await client.connect();
    try {
        await client.sql`
            UPDATE fridge_items
            SET name=${ name },
                quantity=${ quantity },
                expiry_date=${ expiryDate?.toISOString() }
            WHERE id = ${ id };
        `;

        await client.sql`
            DELETE
            FROM fridge_items_owners
            WHERE item_id = ${ id };
        `;

        for (const owner of owners) {
            await client.sql`
                INSERT INTO fridge_items_owners
                VALUES (${ id }, ${ owner.value })
            `;
        }
    } catch {
        console.error("Error updating fridge item", session.user.id, id);
        return { success: false, message: "Couldn't update fridge item" };
    } finally {
        await client.end();
    }

    revalidatePath("/fridge");
    return { success: true, message: "Item updated" };
}
