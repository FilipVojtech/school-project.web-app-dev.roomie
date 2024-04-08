import Link from "next/link";
import ListItem from "@/components/ListItem";

export default function CalendarItem({ id, title }: { id: string; title: string }) {
    return <Link href={ `/event/${ id }/edit` }>
        <ListItem title={ title }/>
    </Link>
};
