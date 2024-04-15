import { type DefaultSession } from "next-auth";
import { type SessionUser } from "@/lib/definitions";

declare module "next-auth" {
    interface Session {
        user: SessionUser & DefaultSession["user"];
    }
}
