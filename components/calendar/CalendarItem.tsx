import Link from "next/link";
import ListItem from "@/components/ListItem";

export default function CalendarItem({ id, title }: { id: number; title: string }) {
    return <Link href={ `/event/${ id }/edit` }>
        <ListItem title={ title }/>
    </Link>
};
