import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/api/rapidapi",
    "/question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jobs",
  ],
  ignoredRoutes: ["/api/webhook/clerk", "/api/openai", "/api/rapidapi"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
