import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

// This would connect to your actual backend API
const backendUrl = process.env.BACKEND_URL || "http://localhost:8080/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
      
        try {
          const response = await fetch(`${backendUrl}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }
      
          // Return user object with accessToken
          return {
            id: data.data.userId.toString(),
            email: data.data.email,
            name: `${data.data.firstName} ${data.data.lastName}`,
            role: data.data.role,
            profilePicture: data.data.profilePicture,
            phoneNumber: data.data.phoneNumber,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     scope: "openid profile email"
      //   }
      // }
    }),

    //  Facebook OAuth Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
      ,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add accessToken to token after initial sign-in
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken; // Add accessToken here
      }

      if (user?.accessToken) {
        try {
          const response = await fetch(`${backendUrl}/api/oauth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              accessToken: user.accessToken,
              email: user.email, 
            }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("User data from backend:", data);
          } else {
            console.error("Error from backend:", data);
          }
        } catch (error) {
          console.error("Error calling backend API:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Include accessToken in session
      if (token) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken; // Add accessToken here
      }
      return session;
    },
  },  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };