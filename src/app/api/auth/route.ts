// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
// Import tes autres providers

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Tes autres providers...
  ],
  // Ton config NextAuth
})

export { handler as GET, handler as POST }