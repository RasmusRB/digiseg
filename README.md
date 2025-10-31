# Digiseg Audiences

Browse and filter audiences from the Digiseg taxonomy API.

## Technologies

- React + TypeScript + Vite
- Redux Toolkit Query (RTK Query)
- Tailwind CSS
- Shadcn/ui

## How to Run

```bash
yarn
yarn run dev
```

Set `VITE_API_URL` in `.env` if needed (defaults to `http://localhost:5000`).

## Assumptions & Trade-Offs

- Robust handling of various states. RTK Query might be overkill for a small project like this, but it's simple and much cleaner to handle various states compared to something like fetch.
- React Query could also be an option (smaller package).
