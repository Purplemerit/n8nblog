import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                // Check for Admin Override from .env
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminPassword = process.env.ADMIN_PASSWORD;

                if (adminEmail && adminPassword &&
                    email === adminEmail &&
                    password === adminPassword) {

                    // Upsert admin user in DB
                    let adminUser = await prisma.user.findUnique({
                        where: { email: adminEmail }
                    });

                    if (!adminUser) {
                        const { hash } = await import('bcryptjs');
                        const hashedPassword = await hash(adminPassword, 12);
                        adminUser = await prisma.user.create({
                            data: {
                                email: adminEmail,
                                password: hashedPassword,
                                role: 'ADMIN',
                                name: 'System Admin',
                                emailVerified: new Date(),
                            }
                        });
                    } else if (adminUser.role !== 'ADMIN') {
                        adminUser = await prisma.user.update({
                            where: { email: adminEmail },
                            data: { role: 'ADMIN', emailVerified: new Date() }
                        });
                    }

                    return {
                        id: adminUser.id,
                        email: adminUser.email,
                        name: adminUser.name,
                        image: adminUser.image,
                        role: adminUser.role,
                    }
                }

                const user = await prisma.user.findUnique({
                    where: { email }
                })

                if (!user || !user.password) {
                    throw new Error("No user found");
                }

                const isPasswordValid = await compare(password, user.password)

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // Check if email is verified
                if (!user.emailVerified) {
                    throw new Error("Email not verified");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role,
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }: any) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "USER";
            }
            return token;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

