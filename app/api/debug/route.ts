"use server";

import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

async function changeDebugPassword() {
    const hash = await bcrypt.hash(process.env.PEPPER! + "BioIN5622*", await bcrypt.genSalt());

    sql`
        UPDATE users
        SET password=${ hash }
        WHERE id = '0a83edd3-cb44-4fbd-9d15-ce8cf02991c8';
    `;
}

export async function GET() {
    await changeDebugPassword();
    return Response.json({ ok: true }, { status: 418 });
}
