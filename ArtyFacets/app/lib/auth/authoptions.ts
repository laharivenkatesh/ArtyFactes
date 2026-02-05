import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { GoogleProfile } from "next-auth/providers/google";
import { AdapterUser } from "next-auth/adapters";
import clientPromise from '@/app/lib/db'
import { Session } from "next-auth"

export const authOptions = {

    adapter: MongoDBAdapter(clientPromise),
    providers: [
        // OAuth authentication providers
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile(profile: GoogleProfile) {
                return {
                    // Return the default fields
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    // Add a new one
                    admin: false,
                };
            },

        })
    ],
    secret: process.env.SECRET,
    callbacks: {
        async session({ session, user }: { session: Session; user: AdapterUser }) {
            session.user.admin = user.admin
            return session;
        },
    }
}