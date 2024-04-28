export type User = {
    id: string;
    household_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birt_date: Date;
    role: string;
}

export type SessionUser = {
    id: string;
    householdId: string | null;
    email: string;
    firstName: string;
    lastName: string;
    name: string;
    initials: string;
    role: string | null;
}
