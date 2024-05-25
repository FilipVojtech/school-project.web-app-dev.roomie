import ListItem from "@/components/ListItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import shajs from "sha.js";

interface MemberItemProps {
    name: string,
    role: string,
    email: string,
    initials: string
}

export default function MemberItem({ name, role, email, initials }: MemberItemProps) {
    const imageHash = shajs("SHA256")
        .update(email.trim().toLowerCase())
        .digest("hex");

    role = role[0].toUpperCase() + role.substring(1);

    return <ListItem className="flex items-center">
        <Avatar className="w-[55px] h-[55px]">
            <AvatarImage src={ `https://gravatar.com/avatar/${ imageHash }?d=404&s=100` }/>
            <AvatarFallback>{ initials }</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-3">
            <h3 className="text-2xl pb-1 -mb-0.5">{ name }</h3>
            <div className="text-md">{ role }</div>
        </div>
    </ListItem>
};
