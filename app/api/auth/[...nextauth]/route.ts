// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import OAuthProvider from "next-auth/providers/oauth";
import { ServerConfig } from "@/app.config";
const backendUrl = process.env.BACKEND_URL || "https://ccmain-hzcbg5c8hzh4dwfc.centralus-01.azurewebsites.net/api";
const authServiceUrl = process.env.AUTH_SERVICE_URL || "https://ccmain-hzcbg5c8hzh4dwfc.centralus-01.azurewebsites.net/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" }, // Add token field
      },
      async authorize(credentials) {
        // Handle regular email/password login
        if (credentials?.email && credentials?.password) {
          try {
            const response = await fetch(`${backendUrl}/users/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.message || "Authentication failed");
            }
            
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
        }
        
        // Handle JWT token from OAuth service
        if (credentials?.token) {
          try {
            // Verify the token with your backend
            const response = await fetch(`${backendUrl}/auth/validate-token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${credentials.token}`  // Send token in header
              },
              // Remove body since we're using Authorization header
            });

            // Check for empty response first
            const text = await response.text();
            if (!text) {
              throw new Error("Empty response from server");
            }

            const data = JSON.parse(text); // Manual parsing for better error handling

            if (!response.ok) {
              throw new Error(data.message || `Token verification failed (HTTP ${response.status})`);
            }
            
            return {
              id: data.userId,
              email: data.email,
              name: data.name,
              role: data.role,
              profilePicture: data.profilePicture,
              accessToken: credentials.token,
            };
          } catch (error) {
            console.error("Token verification error:", error);
            throw new Error("Token verification failed");
          }
        }
        
        return null;
      },
    }),
    // OAuthProvider({
    //   id: "auth",
    //   name: "Google via Auth",
    //   clientId: process.env.AUTH_CLIENT_ID,
    //   clientSecret: process.env.AUTH_CLIENT_SECRET,
    //   authorization: {
    //     url: `${authServiceUrl}/oauth2/authorization/google`,
    //     params: { scope: "openid email profile" }
    //   },
    //   token: { url: `${authServiceUrl}/oauth2/token` },
    //   userinfo: { url: `${authServiceUrl}/userinfo` },
    //   callbackUrl: "http://localhost:3000/api/auth/callback/auth",
    //   profile(profile) {
    //     return {
    //       id: profile.authId || profile.sub,
    //       name: profile.name,
    //       email: profile.email
    //     };
    //   },
    // })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Add user details to token after initial sign-in
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user details to session
      if (token) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: '/login',
  //   error: '/auth/error',
  // },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
