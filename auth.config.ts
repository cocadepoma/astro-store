import type { AdapterUser } from '@auth/core/adapters';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import { defineConfig } from 'auth-astro';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        const [user] = await db.select().from(User).where(eq(User.email, `${email}`));

        if (!user || !bcrypt.compareSync(`${password}`, user.password)) {
          throw new Error('Invalid email or password');
        }

        const { password: _, ...rest } = user;

        return rest;
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user as AdapterUser;

      return session;
    },
  }
});