# Agent Instructions

This project is a modern SvelteKit template. Use the following guidelines when working on this codebase.

## Tech Stack

- **Svelte 5**: Use runes (`$state`, `$derived`, `$props`, etc.) and snippets.
- **SvelteKit**: Standard directory-based routing in `src/routes`.
- **TypeScript**: Strictly typed components and utilities.
- **Tailwind CSS v4**: Utility-first styling integrated via Vite.
- **UI Components**: Shadcn Svelte (located in `src/lib/components/ui`).

## Directory Structure

- `src/routes/`: Application pages and API endpoints.
- `src/lib/components/`: Reusable components (UI and shared).
- `src/lib/utils.ts`: Utility functions (e.g., `cn` for class merging).

## Coding Standards

1. **Svelte 5 Runes**: Always use `$props()`, `$state()`, etc. instead of legacy syntax.
2. **Component Usage**: Prioritize existing UI components in `src/lib/components/ui`.
3. **Type Safety**: Ensure all new components and functions have proper TypeScript definitions.
4. **Icons**: Use `lucide-svelte` for any icons needed.

## Key Commands

- `npm run dev`: Start development server.
- `npm run check`: Run Svelte-check and TypeScript validation.
- `npm run lint`: Lint the codebase.
- `npm run build`: Build the application for production.
