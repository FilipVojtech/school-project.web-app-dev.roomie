import { redirect, RedirectType } from "next/navigation";
import { formatISO } from "date-fns";

export function GET() {
    redirect(`/calendar/${ formatISO(new Date(), { representation: "date" }) }`, RedirectType.replace);
}
