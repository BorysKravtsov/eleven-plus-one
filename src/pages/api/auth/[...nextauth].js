import dbConnect from "@/pages/lib/connect";
import User from "../../../../models/User";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      try {
        await dbConnect();
        let user = await User.findOne({ email: profile.email });
        if (!user) {
          user = await User.create({
            email: profile.email,
            name: profile.name || "No Name",
            username: profile.email.split("@")[0],
            image: profile.avatar_url || profile.picture || "",
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, profile }) {
      if (profile) {
        await dbConnect();
        const user = await User.findOne({ email: profile.email });
        if (user) {
          token.id = user._id.toString();
          console.log("JWT Token ID:", token.id);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      console.log("Session Object:", session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
