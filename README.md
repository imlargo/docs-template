# svelte-template

> A SvelteKit 2 + Svelte 5 starter for content/documentation sites - a Starlight-style shell
> (sidebar nav, dark mode, shadcn-svelte primitives) without the Astro-specific parts.

[![Svelte](https://img.shields.io/badge/svelte-5-FF3E00)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/sveltekit-2-FF3E00)](https://svelte.dev/docs/kit)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6)](https://www.typescriptlang.org)
[![Cloudflare Workers](https://img.shields.io/badge/deploy-cloudflare%20workers-F38020)](https://workers.cloudflare.com)

- **No backend by default.** Nothing to migrate, seed, or point at an API - pages are plain
  SvelteKit routes. Add a service layer under `src/lib/features/<slice>/services/` if a project
  ends up needing one.
- **A layered `src/lib`** - `core` (infrastructure), `features` (vertical slices), `components`
  (`ui`/`blocks`/`layout`) - so a new feature has one obvious place to live.
- **shadcn-svelte**, used as intended: the primitives in `components/ui/` stay untouched; every
  composition sits beside them, never inside them.

## What's already solved

| Concern       | Building it yourself                        | This template                                                       |
| ------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| Sidebar + nav | a layout built per project                  | driven by `$lib/config/navigation.ts`                               |
| Deploy target | adapter and worker config assembled by hand | `adapter-cloudflare` + `wrangler.jsonc`, ready to `wrangler deploy` |

## Getting started

```sh
pnpm install
pnpm run dev
```

The dev server starts on <http://localhost:5173>.

## Architecture

```
src/
├── hooks.server.ts    # handleError only - add a Handle here when the app needs one
├── lib/
│   ├── core/          # logger - infrastructure only
│   ├── config/        # app.ts (branding), navigation.ts
│   ├── types/         # Types shared by more than one feature
│   ├── utils/         # Pure functions - date, string, route
│   ├── hooks/         # Stateful runes classes: Disclosure, IsMobile
│   ├── features/      # Vertical slices - components, services, types together, as needed
│   ├── server/        # Server-only code, never imported from a `.svelte` file
│   └── components/    # ui/ (shadcn, untouched), blocks/, layout/
└── routes/
    ├── (app)/         # Pages, rendered inside the sidebar layout
    └── api/           # Server endpoints
```

`$components`, `$ui`, `$core`, `$hooks`, `$types` and `$utils` are real aliases (declared in
`vite.config.ts`, no separate `svelte.config.js`), not barrels - each resolves straight to a file.

See [`AGENTS.md`](./AGENTS.md) for the conventions this structure depends on: where a type belongs,
when a hook earns its own file, and the rules around `$state` at module scope on the server.

## Testing

```sh
pnpm run test        # vitest, run once - browser tests (Playwright) and server tests both
pnpm run test:unit    # vitest, watch mode
```

Two Vitest projects, split by what they need: `*.svelte.{test,spec}.ts` run in a real Chromium tab
(`@vitest/browser-playwright`), everything else runs in Node. `src/lib/server/**` is excluded from
the browser project on purpose - server-only code has no business compiling for a browser test.

## Deploying

Built for Cloudflare Workers via `@sveltejs/adapter-cloudflare`:

```sh
pnpm run build     # wrangler types --check, then vite build
wrangler deploy
```

`wrangler.jsonc`'s `name` is still the placeholder `"app"` - rename it, and `name` in
`package.json`, before the first deploy. `pnpm run gen` regenerates `worker-configuration.d.ts`
from `wrangler.jsonc` after any binding change.

## Customization checklist

- [ ] Set `branding` in `$lib/config/app.ts` - name, logo, favicon and SEO all come from this one
      object, not from the pages that display them
- [ ] Rename `"app"` to the project's real name in `package.json` and `wrangler.jsonc`
- [ ] Add nav items in `$lib/config/navigation.ts`
- [ ] Add feature slices under `src/lib/features/`, each with its own
      `services/`, `schemas.ts`, `types.ts`, `components/`

## Scripts

```sh
pnpm run dev          # Dev server, http://localhost:5173
pnpm run build        # wrangler types --check, then production build
pnpm run preview      # Serve the built worker locally, port 4173
pnpm run check        # wrangler types --check, svelte-kit sync, svelte-check
pnpm run lint         # Prettier + ESLint
pnpm run format       # Prettier --write
pnpm run test         # Vitest (browser + server projects), once
pnpm run gen          # Regenerate worker-configuration.d.ts from wrangler.jsonc
```
