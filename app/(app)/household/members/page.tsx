import Header from "@/components/Header";
import MemberItem from "@/components/household-members/MemberItem";
import { User } from "@/lib/definitions";
import { fetchHouseholdMembers } from "@/app/(app)/household/members/_actions";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import InviteUserForm from "@/components/household-members/InviteUserForm";

export default async function HouseholdUsersPage() {
    const users: User[] = await fetchHouseholdMembers() ?? [];

    return <>
        <Header title="Household members"/>
        <main>
            <AddUserButton/>
            <UserItems users={ users }/>
        </main>
    </>;
};

interface UserItemsProps {
    users: User[];
}

function UserItems({ users }: UserItemsProps) {
    return <div className="grid md:grid-cols-2 gap-1.5 md:gap-2.5">
        { users.map(user => (
                <Dialog key={user.id}>
                    <DialogTrigger>
                        <MemberItem
                            name={ `${ user.first_name } ${ user.last_name }` }
                            role={ user.role }
                            email={ user.email }
                            initials={ `${ user.first_name[0] }${ user.last_name[0] }` }
                        />
                    </DialogTrigger>
                </Dialog>
            )
        ) }
    </div>
}

function AddUserButton() {
    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mb-2">
                    <UserPlus className="mr-2 h-4 w-4"/> Invite user
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send an invite</DialogTitle>
                </DialogHeader>
                <InviteUserForm/>
            </DialogContent>
        </Dialog>
    </>
}
