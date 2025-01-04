import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isAuth = !!token
      const isUploadPage = req.nextUrl.pathname.startsWith('/upload')
      
      if (isUploadPage) {
        return isAuth
      }
      
      return true
    },
  },
})

export const config = {
  matcher: ["/upload/:path*"]
}