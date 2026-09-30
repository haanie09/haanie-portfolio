# haanie.com

Personal portfolio for The Academy (Founding Class Fellowship) application. Next.js, static, deployed on Vercel.

## Edit the words
Everything you read on the site lives in **`content/site.ts`**.

- `slot("Q9", "prompt")` → an empty dashed box. Fill it: `slot("Q9", "prompt", "Your words here.")`
- `draft("…")` → placeholder wording from your facts. Rewrite in your voice, then drop the `draft()` wrapper.
- `npm run check-copy` → lists every empty slot and draft still left.

## Add photos
Put images in `public/photos/` (see the README there), then set the paths in `content/site.ts`.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # what Vercel runs
```

## Deploy
1. Push this folder to a new GitHub repo (`haanie-portfolio`).
2. vercel.com → Add New → Project → import the repo → Deploy (no settings needed).
3. Project → Settings → Domains → add `haanie.com`.
