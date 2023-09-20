import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import AuthController from '@/utility/controller';
import db from '@/lib/db';

const secret ='pro2r7Bv1Q70G3ISOJnQWxr3BPORMIuE1IaSkxY1dYs='
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // OAuth authent ication providers...
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'name@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const user = await db.user
          .findFirst({
            where: { email: username },
          })
          .then(async (user) => {
            if (!user) throw new Error('User not found');
            const isMatch = AuthController.bcrypt.compareSync(
              password,
              user.password as string
            );
            if (!isMatch) throw new Error('Incorrect password or username');
            return user;
          })
          .catch((error) => {
            if(error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error('Login Failed!')
          })
          .finally(async () => await db.$disconnect());
        return user;
      },
    }),
  ],

  pages: {
    signIn: '/auth', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
  },
  secret: process.env.NEXTAUTH_SECRET || secret,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // jwt: true,
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1 * 1 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 1 * 60 * 60, // 24 hours
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret.
    secret: process.env.NEXTAUTH_SECRET || secret,
    maxAge: 60 * 60 * 1 * 1, // 30 days
    // Set to true to use encryption (default: false)
    // encryption: true,

    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, key, token, maxAge }) => {},
    // decode: async ({ secret, key, token, maxAge }) => {},
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
