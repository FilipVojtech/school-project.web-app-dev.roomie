"use client";

import ListItem from "@/components/ListItem";
import { Clock, Minus, Plus, UsersRound } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function FridgeItem({ id, name, bestBefore, owners, quantity }: {
    id: string;
    name: string;
    bestBefore?: Date;
    owners: { [key: symbol]: any, firstName: string, lastName: string }[];
    quantity: number;
}) {
    const [ getQuantity, setGetQuantity ] = useState(quantity);
    let ownersString: string = "You";

    /**
     * Handle change while ensuring the value does not decrease below 0
     * @param value
     * @param event
     */
    function handleChange(value: string | number, event: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent) {
        const newValue: number = Math.max(
            0,
            typeof value == "string" ? Number.parseInt(value) : value
        );

        preventEventPropagation(event);
        setGetQuantity(newValue);
    }

    function handleBlur(value: string) {
        if (value == "") {
            setGetQuantity(0);
        }
    }

    function preventEventPropagation(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (owners.length > 1) {
        for (let i = 1; i < owners.length; i++) {
            const { firstName, lastName } = owners[i];
            ownersString += `, ${ firstName } ${ lastName.charAt(0) }.`;
        }
    }

    return <Link href={ `/fridge/${ id }/edit` }>
        <ListItem title={ name } className="flex justify-between gap-1 h-min">
            <div className="flex-1 flex-col gap-0.5">
                {
                    bestBefore &&
                    <div className="flex gap-1">
                        <Clock className="h-5 w-5"/>
                        { bestBefore.toDateString() }
                    </div>
                }
                <div className="flex gap-1">
                    <div>
                        <UsersRound className="h-5 w-5"/>
                    </div>
                    <span className="max-w-fit">{ ownersString }</span>
                </div>
            </div>
            <div className="flex items-end">
                <div className="flex rounded-md overflow-clip h-fit">
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-0 rounded-none"
                        onClick={ e => handleChange(getQuantity + 1, e) }
                    >
                        <Plus size={ 16 }/>
                    </Button>
                    <Input
                        type="number"
                        value={ getQuantity }
                        className="w-14 text-lg text-center border-0 border-x-2 rounded-none no-spin-buttons"
                        onClick={ e => preventEventPropagation(e) }
                        onChange={ e => handleChange(e.target.value, e) }
                        onBlur={ e => handleBlur(e.target.value) }
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-0 rounded-none"
                        onClick={ e => handleChange(getQuantity - 1, e) }
                    >
                        <Minus size={ 16 }/>
                    </Button>
                </div>
            </div>
        </ListItem>
    </Link>;
}
