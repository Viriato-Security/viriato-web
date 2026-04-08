# Contributing to Viriato Security Web

Thank you for your interest in contributing. This project is the official website for [Viriato Security](https://viriatosecurity.com).

## Running locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Branch naming

| Type    | Pattern              | Example                        |
| ------- | -------------------- | ------------------------------ |
| Feature | `feature/<name>`     | `feature/waitlist-backend`     |
| Fix     | `fix/<name>`         | `fix/navbar-mobile-overflow`   |
| Docs    | `docs/<name>`        | `docs/update-contributing`     |

## Commit convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix    | When to use                               |
| --------- | ----------------------------------------- |
| `feat:`   | New feature or page section               |
| `fix:`    | Bug fix                                   |
| `docs:`   | Documentation only changes                |
| `style:`  | CSS/visual changes with no logic change   |
| `chore:`  | Build process, dependency updates, config |
| `refactor:` | Code restructure with no behavior change |

## Pull request process

1. Branch off `main` using the naming convention above.
2. Make focused, atomic commits following the convention.
3. Ensure `npm run build` passes with zero TypeScript errors before opening a PR.
4. Open your PR with a clear title and description summarizing what changed and why.
5. A maintainer will review within 2 business days.

## Questions

For general questions, reach out at contact@viriatosecurity.com.
