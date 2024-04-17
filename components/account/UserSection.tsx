import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import shajs from 'sha.js';
import { auth } from "@/auth";

export default async function UserSection() {
    const session = await auth();
    if (!session?.user) {
        return <>
            <p>Couldn&apos;t load this section</p>
        </>
    }
    const { email, name, initials } = session.user;
    const hash = shajs("SHA256")
        .update(email.trim().toLowerCase())
        .digest("hex");

    return <div className="flex gap-1.5 flex-col items-center select-none">
        <Avatar className="w-[100px] h-[100px] mb-2">
            <AvatarImage src={ `https://gravatar.com/avatar/${ hash }?d=404&s=100` }/>
            <AvatarFallback><span className="text-3xl">{ initials }</span></AvatarFallback>
        </Avatar>
        <div className="text-2xl">{ name }</div>
        <div>{ email }</div>
    </div>;
}
