# Expense Tracker

A mobile app to track daily expenses, set monthly budgets per category, and visualize spending with a pie chart.

Built with **React Native + Expo** — runs on iOS and Android from a single codebase, with local persistence via SQLite (no backend required).

## Features

- **Expense log** — add, edit and delete expenses with category, amount, date and note
- **7 categories** — Food, Transport, Shopping, Health, Entertainment, Housing, Other
- **Monthly summary** — total spent with a budget progress bar
- **Pie chart** — visual breakdown of spending by category (SVG, no external chart lib)
- **Budget settings** — set a monthly limit per category, tracked in real time
- **Offline-first** — all data stored locally with expo-sqlite, no account needed

## Tech Stack

| | |
|---|---|
| Framework | React Native + Expo SDK 52 |
| Navigation | Expo Router (file-based) |
| Storage | expo-sqlite (SQLite) |
| Charts | react-native-svg (custom implementation) |
| Language | TypeScript |

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo dev server
npx expo start
```

Scan the QR code with **Expo Go** on your phone, or press `a` for Android emulator / `i` for iOS simulator.

## Project Structure

```
expense-tracker/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx      # Expense list + summary
│   │   ├── stats.tsx      # Pie chart + breakdown
│   │   └── settings.tsx   # Monthly budget setup
│   ├── add.tsx            # Add / edit expense modal
│   └── _layout.tsx
├── components/
│   ├── ExpenseItem.tsx
│   └── SummaryCard.tsx
├── hooks/
│   └── useExpenses.ts     # CRUD + state management
├── lib/
│   └── database.ts        # SQLite operations
└── constants/
    └── categories.ts
```
