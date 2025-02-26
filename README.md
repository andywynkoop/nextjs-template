## Setup

1. Initialize git repo, push to github
2. Sync to Vercel
3. Create .env file
4. Set up storage with Vercel Postgres
5. Copy .env files from Vercel to local
6. run `openssl rand -base64 32` from command line
7. Add the output to .env as `AUTH_SECRET`
8. Add AUTH_SECRET to Vercel environment (under settings)
