import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import shajs from 'sha.js';

export default function UserSection() {
    // TODO: Data of the actual user
    const { email, name, initials } = {
        email: "filip.vojtech@outlook.com",
        name: "Test Debugger",
        initials: "FV",
    };
    const hash = shajs("SHA256")
        .update(email.trim().toLowerCase())
        .digest("hex");

    return <div className="flex gap-1.5 flex-col items-center select-none">
        <Avatar className="w-[100px] h-[100px] mb-2">
            <AvatarImage src={ `https://gravatar.com/avatar/${ hash }?d=404&s=64` }/>
            <AvatarFallback><span className="text-3xl">{ initials }</span></AvatarFallback>
        </Avatar>
        <div className="text-2xl">{ name }</div>
        <div>{ email }</div>
    </div>;
}
