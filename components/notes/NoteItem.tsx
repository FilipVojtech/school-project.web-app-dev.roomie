import ListItem from "@/components/ListItem";
import Link from "next/link";
import type { NoteItem } from "@/lib/definitions";
import type { CSSProperties } from "react";

export default function NoteItem({ id, title, content }: NoteItem) {
    const randomRot = Math.floor(Math.random() - 0.5);
    const style: CSSProperties = {
        transform: `rotate(${ randomRot }deg)`,
    }

    return <Link style={ style } href={ `/notes/${ id }/edit` }>
        <ListItem title={ title }>
            <p className="border-t-2 border-white border-dashed pt-1">{ content }</p>
        </ListItem>
    </Link>;
};
