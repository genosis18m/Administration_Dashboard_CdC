import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin") {
          return { id: "1", email: "admin@example.com", name: "Admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
})