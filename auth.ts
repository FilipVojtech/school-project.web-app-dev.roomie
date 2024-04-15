import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [ Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                const passwordMatch = await bcrypt.compare(user.password, password);

                if (passwordMatch) return user;
            }

            return null;
        },
    }) ]
});
