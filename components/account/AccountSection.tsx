import SettingsSection from "@/components/account/SettingsSection";
import SettingsItem from "@/components/account/SettingsItem";
import { AtSign, ImageIcon, Lock, LogOut, TextCursorInput, Trash2 } from "lucide-react"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AccountSection() {
    return <SettingsSection title="Account">
        <SettingsItem title="Update profile picture" icon={ <ImageIcon/> }/>
        <ChangeNameOption/>
        <SettingsItem title="Change email" icon={ <AtSign/> }/>
        <SettingsItem title="Change password" icon={ <Lock/> }/>
        <SettingsItem title="Leave household" icon={ <LogOut/> } destructive/>
        <SettingsItem title="Delete account" icon={ <Trash2/> } destructive/>
    </SettingsSection>;
}

function ChangeNameOption() {
    return <Dialog>
        <DialogTrigger asChild>
            <SettingsItem title="Change name" icon={ <TextCursorInput/> }/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Change name</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
}


