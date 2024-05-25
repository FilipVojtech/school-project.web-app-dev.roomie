export type User = {
    id: string;
    household_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birt_date: Date;
    role: string;
};

export type SessionUser = {
    id: string;
    householdId: string | null;
    email: string;
    firstName: string;
    lastName: string;
    name: string;
    initials: string;
    role: string | null;
};

export type FridgeItem = {
    id: string;
    household_id: string,
    name: string;
    quantity: number;
    owners: string[];
    expiry_date: Date;
};

export type NoteItem = {
    id: string;
    author_id: string;
    created_at: Date;
    title?: string;
    content: string;
    pinned: boolean;
}

export type CalendarItem = {
    id: string;
    title: string;
    author_id: string;
    household_id: string;
    repeating: boolean;
    frequency: any;
    starts_on: Date;
}
