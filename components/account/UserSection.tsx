import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import shajs from 'sha.js';

export default function UserSection() {
    // TODO: Data of the actual user
    const userEmail: string = "filip.vojtech@outlook.com";
    const hash = shajs("SHA256")
        .update(userEmail.trim().toLowerCase())
        .digest("hex");
    const userName = "Test Debugger"

    return <div className="flex-col items-center bg-red-200">
        <Avatar>
            <AvatarImage src={ `https://gravatar.com/avatar/${ hash }?d=404&s=64` } height={ 64 } width={ 64 }/>
            <AvatarFallback>FV</AvatarFallback>
        </Avatar>
        <div className="text-2xl">{ userName }</div>
    </div>;
}
