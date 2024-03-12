"use client";

import ListItem from "@/components/ListItem";
import { Clock, Minus, Plus, UsersRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FridgeItem({ name = "Hello", bestBefore, owners }: {
    name: string;
    bestBefore?: Date;
    owners: { [key: symbol]: any, firstName: string, lastName: string }[];
}) {
    const [ quantity, setQuantity ] = useState(1);
    let ownerString: string = "You";

    /**
     * Handle change while ensuring the value does not decrease below 0
     * @param value
     */
    function handleChange(value: string | number) {
        const newValue: number = Math.max(
            0,
            typeof value == "string" ? Number.parseInt(value) : value
        );

        setQuantity(newValue);
    }

    function handleBlur(value: string) {
        if (value == "") {
            setQuantity(0);
        }
    }

    if (owners.length > 1) {
        for (const owner of owners) {
            ownerString += `, ${ owner.firstName } ${ owner.lastName.charAt(0) }`;
        }
    }

    return <ListItem className="flex justify-between">
        <div className="flex flex-col gap-0.5">
            <div className="text-2xl">{ name }</div>
            {
                bestBefore &&
                <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5"/>
                    { bestBefore.toDateString() }
                </div>
            }
            <div className="flex items-center gap-1">
                <UsersRound className="h-5 w-5"/>
                { ownerString }
            </div>
        </div>
        <div className="flex items-end">
            <div className="flex rounded-md overflow-clip h-fit">
                <Button
                    variant="outline"
                    size="icon"
                    className="border-0 rounded-none"
                    onClick={ () => handleChange(quantity + 1) }
                >
                    <Plus size={ 16 }/>
                </Button>
                <Input
                    type="number"
                    value={ quantity }
                    className="w-14 text-lg text-center border-0 border-x-2 rounded-none no-spin-buttons"
                    onChange={ e => handleChange(e.target.value) }
                    onBlur={ e => handleBlur(e.target.value) }
                />
                <Button
                    variant="outline"
                    size="icon"
                    className="border-0 rounded-none"
                    onClick={ () => handleChange(quantity - 1) }
                >
                    <Minus size={ 16 }/>
                </Button>
            </div>
        </div>
    </ListItem>;
}
