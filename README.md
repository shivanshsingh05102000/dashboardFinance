# Finance Dashboard UI (Zorvyn Assessment)

This project is my frontend assignment submission for the Zorvyn Finance Dashboard task.

It is a React dashboard where users can track balance, review transactions, and view quick insights from the same shared data store.

Live URL: https://dashboard-finance-ui.vercel.app?_vercel_share=bz2fxlkEJ9YEDpw52w5ZWlCW0dNvMrt8

## Demo

![Finance Dashboard Demo](docs/screen-capture-20-trimmed.gif)

## What I Built

- Dashboard overview with summary cards (balance, income, expenses)
- Time-based visualization (income vs expense trend over recent months)
- Categorical visualization (expense breakdown by category)
- Transactions section with search, filters, sorting, and responsive layout
- Frontend role simulation:
  - Viewer: read-only
  - Admin: add, edit, delete, export CSV
- Insights section:
  - Highest spending category
  - Monthly income vs expense
  - Savings and activity metrics
- State handled via Context + useReducer, with localStorage persistence
- Light/dark mode and mobile-friendly design

## Requirement Coverage

1. Dashboard Overview: Implemented with cards + charts.
2. Transactions Section: Date, amount, category, type + search/filter/sort.
3. Basic Role Based UI: Viewer/Admin switch in navbar.
4. Insights Section: Top category, monthly comparison, quick observations.
5. State Management: Global context for transactions, role, theme, filters.
6. UI/UX: Responsive cards/table, empty states, readable themes.

## Tech Stack

- React + Vite
- Tailwind CSS
- Context API + useReducer
- Recharts

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
  context/
  data/
  pages/
  utils/
  App.jsx
  index.css
  main.jsx
```

## Notes

- Mock data is preloaded so charts and filters can be tested immediately.
- All computed numbers/charts are derived from the same transaction dataset.
- Theme, role, and transaction list are stored in localStorage.

## If I Had More Time

- Add unit tests for reducers and finance utility methods.
- Add pagination/virtualization for very large transaction lists.
- Add optional API mode (mock server + loading/error states).
