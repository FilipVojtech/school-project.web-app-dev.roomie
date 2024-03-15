import ListItem from "@/components/ListItem";
import Link from "next/link";

export default function NoteItem({ id, title, text }: { id: number, title?: string, text: string }) {
    const randomRot = Math.floor((Math.random() * 7) - 3.75);
    const style = {
        transform: `rotate(${ randomRot }deg)`,
    }

    return <Link style={ style } href={ `/notes/${ id }/edit` }>
        <ListItem>
            <h3 className="text-2xl border-b-2 border-white border-dashed pb-1">{ title }</h3>
            <p className="pt-1">{ text }</p>
        </ListItem>
    </Link>;
};
