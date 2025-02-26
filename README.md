## Setup

1. Clone this repo and push to a new repo
2. Initialize git repo, push to github
3. Sync to Vercel
4. Create .env file
5. Set up storage with Vercel Postgres
6. Copy .env files from Vercel to local
7. run `openssl rand -base64 32` from command line
8. Add the output to .env as `AUTH_SECRET`
9. Add AUTH_SECRET to Vercel environment (under settings)
10. Run `pnpm install`
11. In order for bcrypt to work for auth, you need to run pnpm approve-builds
12. Run `pnpm run dev`
13. Push to main to deploy on Vercel
