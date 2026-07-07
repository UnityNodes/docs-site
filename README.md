# Unity Nodes Docs

Mintlify-powered documentation site for Unity Nodes.

## Local preview

Install Mintlify CLI, then run at repo root:

    npm i -g mintlify
    mintlify dev

Opens on http://localhost:3000.

## Deploy

1. Push this repo to GitHub (public or private).
2. Sign in at [mintlify.com](https://mintlify.com) → connect the repo.
3. Set the domain in Mintlify dashboard: `docs.unitynodes.com` (or similar).
4. Add DNS record in Cloudflare per Mintlify instructions (they'll show a CNAME).

Auto-deploys on every push to `main`.

## Structure

    mint.json                # site config
    introduction.mdx         # landing page
    snapshots/
      overview.mdx           # snapshots hub
      bradbury.mdx           # Bradbury-specific guide
    logo/, favicon.svg       # branding assets (replace with real ones)
